import {
  AsyncStorage,
	NativeModules
} from 'react-native';

import {GoogleSignin} from 'react-native-google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import {API} from './global';

export default class MailHelper {

	static registerTask() {
    NativeModules.TimerModule.startTimer(5000, this.sendPhotos);
	}

	static sendPhotos() {
		var that = this;
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/gmail.send"], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: false // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })
    .then(() => {
      GoogleSignin.currentUserAsync()
      .then(res => {
        var pass = res.accessToken;
        var user = res.id;
        Keychain.setInternetCredentials('google', user, pass)
        .then(() => {
        	console.log('MailHelper: refresh token');
        	MailHelper.getInstagram();
        	MailHelper.getFacebook();
        })
        .catch(err => console.log('MailHelper: Keychain error ', err));
      })
      .catch(err => console.log('MailHelper: refresh token error ', err));
    });
	}

	static updateUser(platform, index, last) {
		console.log('updateUser: set new last for user ' + index + ' last ' + last);
		AsyncStorage.getItem(platform)
		.then(res => {
			var data = JSON.parse(res);
			data.users[index].last = last;
			AsyncStorage.setItem(platform, JSON.stringify(data))
			.catch(err => console.log('AsyncStorage setItem error ', err));			
		})
		.catch(err => console.log('AsyncStorage getItem error ', err))
	}


	static getFacebook() {
	  var that = this;
    AccessToken.refreshCurrentAccessTokenAsync()
    .then(res => {
      var token = res.accessToken;

			AsyncStorage.getItem('facebook')
		  .then(res => {
		    if (res != null) {
		      var data = JSON.parse(res);
		      if (data.users) {
			      for (var i = 0; i < data.users.length; i++) {
			      	if (data.users[i].add) {
			      		console.log('Sending photo from facebook user: ', data.users[i]);
				      	var user = data.users[i].id;
				      	var last = data.users[i].last;
				 				var index = i;
					      var url = API.FB + user + '/photos?fields=images,created_time&access_token=' + token;
					      fetch(url)
				        .then(res => res.json())
				        .then(res => {
				        	if (res.data && res.data.length) {
						 				var new_last = last;
					        	for (var j = 0; j < res.data.length; j++) {
					        		var format = res.data[j].created_time.split('+')[0];
					        		var timeStamp = Date.parse(format);
					        		if (timeStamp > last) {
							          new_last = new_last < timeStamp ? timeStamp : new_last;
							          var imgUrl = res.data[j].images[0].source;
						            that.sendMail(imgUrl);
					        		} else {
					        			console.log('MailHelper: facebook photo too old');
					        		}
					        	}
					        	if (new_last !== last) {
						        	MailHelper.updateUser('facebook', index, new_last);
					        	}
				        	} else {
				        		console.log('MailHelper: fetch problem ', res);
				        	}
				        })
				        .catch(err => console.log('MailHelper: fetch error ', err));
			      	}
				    }
			    }
			  }
			})
			.catch(err => console.log('MailHelper: AsyncStorage error ', err))
		})
		.catch(err => console.log('LoginManager: cant refresh token ', err));
	}

	static getInstagram() {
    console.log('MailHelper: getInstagram invoke');
	  var that = this;
	  Keychain.getInternetCredentials('instagram')
    .then(sec => {
      var token = sec.password

			AsyncStorage.getItem('instagram')
		  .then(res => {
		    if (res != null) {
		      var data = JSON.parse(res);
		      if (data.users) {
			      for (var i = 0; i < data.users.length; i++) {
			      	if (data.users[i].add) {
			      		console.log('Sending photo from instagram user: ', data.users[i]);
				      	var user = data.users[i].id;
				      	var last = data.users[i].last;
				 				var index = i;
					      var url = API.IN + 'users/' + user + '/media/recent/?' + token;
					      fetch(url)
				        .then(res => res.json())
				        .then(res => {
				        	if (res.data && res.data.length) {
						 				var new_last = last;
					        	for (var j = 0; j < res.data.length; j++) {
					        		var timeStamp = res.data[j].created_time;
					        		if (timeStamp > last) {
							          new_last = new_last < timeStamp ? timeStamp : new_last;
							          var imgUrl = res.data[j].images.standard_resolution.url
						            that.sendMail(imgUrl);
					        		} else {
					        			console.log('MailHelper: insta photo too old');
					        		}
					        	}
					        	if (new_last !== last) {
						        	MailHelper.updateUser('instagram', index, new_last);
					        	}
				        	} else {
				        		console.log('MailHelper: fetch problem ', res);
				        	}
				        })
				        .catch(err => console.log('MailHelper: fetch error ', err));
			      	}
				    }
			    }
			  }
			})
			.catch(err => console.log('MailHelper: AsyncStorage error ', err));
		})
	  .catch(err => console.log('MailHelper: Keychain error ', err));
  }

  static sendMail(imgUrl) {
    var that = this;
    Keychain.getInternetCredentials('google')
    .then(function(sec) {
    	var user_id = sec.username;
    	var access_token = sec.password;

      RNFetchBlob.fetch('GET', imgUrl, {})
      .then(res => {

      	AsyncStorage.getItem('emails')
		    .then(res => {
		    	emails = JSON.parse(res);


		      var encodedMail = that.mailBody(res, emails);
		      fetch('https://www.googleapis.com/gmail/v1/users/' + 
		        user_id + 
		        '/messages/send?key=' + 
		        'AIzaSyBad0oLjiEm8TJwQ2PIma97jLhT3tD_aAI'
		        + '?uploadType=multipart',
		        {
		          method: 'POST',
		          headers: {
		            'Authorization': 'Bearer ' + access_token,
		            'Content-Type': 'application/json',
		          },
		          body: JSON.stringify({
		            raw:encodedMail 
		          })
		        })
		      .then(res => res.json())
		      .then(res => {
		          console.log('MailHelper: Gmail API success ' + JSON.stringify(res));
		        })
		      .catch(err => console.log('MailHelper: Gmail API error', err));
	      })
			  .catch(err => console.log('AsyncStorage: get emails error ', err));
		  })
      .catch(err => console.log('MailHelper: RNFetchBlob error ', err));
    })
    .catch(err => console.log('MailHelper: Keychain error ', err));
  }

  static mailBody(img, emails) {
    return encode(
      "MIME-Version: 1.0\n" +
      "Subject: [photo]\n" +
      // "To: ramkazoome@gmail.com\n" +
      "Cc: " + emails.join(', ') + "\n" + 
      "Content-Type: multipart/mixed; boundary=foo_bar_baz\n\n" +

      // "--foo_bar_baz\n" + 
      // "Content-Type: text/plain; charset=\"UTF-8\"\n\n" +
      // "The actual message text goes here" + 

      "\n\n--foo_bar_baz\n" + 
      "Content-Type: image/jpeg;\n" + 
      "MIME-Version: 1.0\n" + 
      "Content-Disposition: attachment; filename=\"example.jpg\"\n" + 
      "Content-Transfer-Encoding: base64\n\n" + 

      img.base64() + 

      "\n\n--foo_bar_baz--"
    ).replace(/\+/g, '-').replace(/\//g, '_');
  }

}