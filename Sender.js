
import {GoogleSignin} from 'react-native-google-signin';
import RNFetchBlob from 'react-native-fetch-blob';

// import mailcomposer from 'mailcomposer';

import {API} from './Global';
import {encode} from 'base-64'


export const sendPhoto = (img) => {
		console.log('Sender.sendPhoto(img) start');
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
      offlineAccess: false,
			iosClientId: API.GM_CLIENT,
    })
    .then(() => {
      GoogleSignin.signIn()
      .then(user => {

        const pass = user.accessToken;
        const userId = user.id;
        const userEmail = user.email;
        console.log(JSON.stringify(user));

        fetchImageLocal(img)
        .then(res => {

          var mail = createMail('ramkazoome@gmail.com', res)
          sendGmail(userId, pass, mail);
        })
      })

    })
    .catch(err => console.log('GoogleSignin.configure ', err));
	}


const fetchImageLocal = (url) => 
  RNFetchBlob.fs.readFile(url, 'base64')

const fetchImageOuter = (url) =>
  RNFetchBlob.fetch('GET', url, {})
  .then(res => res.base64())

const createMail = (email, img) => {
    var boundary = Date.now()
    return encode(
      "MIME-Version: 1.0\n" +
      "Subject: photo\n" +
      // "To: ramkazoome@gmail.com\n" +
      "Bcc: " + email + "\n" + 
      "Content-Type: multipart/mixed; boundary=" + boundary + "\n\n" +

      // "--foo_bar_baz\n" + 
      // "Content-Type: text/plain; charset=\"UTF-8\"\n\n" +
      // "The actual message text goes here" + 

      "\n\n--" + boundary + "\n" + 
      "Content-Type: image/jpeg;\n" + 
      "MIME-Version: 1.0\n" + 
      "Content-Disposition: attachment; filename=\"photo.jpg\"\n" + 
      "Content-Transfer-Encoding: base64\n\n" + 
      img + 
      "\n\n--" + boundary + "--"
    ).replace(/\+/g, '-').replace(/\//g, '_');
}

const sendGmail = (user, token, contents) => {
  fetch(API.GM_SEND(user), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: contents })
  })
  .then(res => res.json())
  .then(res => console.log(`Gmail API success ${JSON.stringify(res)}`))
  .catch(err => console.log('Gmail API error', err));		
}