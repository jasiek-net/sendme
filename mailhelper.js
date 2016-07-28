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
        })
        .catch(err => console.log('MailHelper: Keychain error ', err));
      })
      .catch(err => console.log('MailHelper: refresh token error ', err));
    });
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
			      for (var i=0; i < data.users.length; i++) {
			      	if (data.users[i].add) {
			      		console.log('Sending photo from instagram user: ', data.users[i].id);
				      	var user = data.users[i].id;
					      var url = 'https://api.instagram.com/v1/users/' 
					        + user + '/media/recent/?' + token;
					      fetch(url)
				        .then(res => res.json())
				        .then(res => {
				        	if (res.data && res.data.length) {
					        	for (var j=0; j < res.data.length; j++) {
						          var imgUrl = res.data[j].images.standard_resolution.url
					            // that.sendMail(imgUrl);
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

	      var encodedMail = that.mailBody(res);
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
      .catch(err => console.log('MailHelper: RNFetchBlob error ', err));
    })
    .catch(err => console.log('MailHelper: Keychain error ', err));
  }

  static mailBody(img) {
    return encode(
      "MIME-Version: 1.0\n" +
      "Subject: [photo]\n" +
      "To: ramkazoome@gmail.com\n" +
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