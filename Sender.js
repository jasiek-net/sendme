
import {
  AsyncStorage,
} from 'react-native';

import {GoogleSignin} from 'react-native-google-signin';
import RNFetchBlob from 'react-native-fetch-blob';

// import mailcomposer from 'mailcomposer';

import {API} from './Global';
import {encode} from 'base-64'


export const sendPhoto = (img) => 
  new Promise((resolve, reject) => {
		console.log('Sender.sendPhoto(img) start');
    Promise.all([
      fetchGmailUser(),
      fetchImageLocal(img),
      fetchRecipients(),
    ])
    .then(([
      user,
      image,
      recip,
    ]) => {
      const pass = user.accessToken;
      const userId = user.id;
      var mail = createMail('ramkazoome@gmail.com', image)
      sendGmail(userId, pass, mail)
      .then(res => resolve(res));
    })
    .catch(err => reject(err));
	})


const fetchGmailUser = () =>
  new Promise((res, rej) => {
    GoogleSignin.configure(API.GM_CONFIG)
    .then(() => {
      GoogleSignin.signIn().then(usr => {
        if (usr) res(usr)
        else rej('Google SignIn error')
      })
      .catch(rej);
    })
    .catch(rej);
  })

const fetchImageLocal = (url) => 
  RNFetchBlob.fs.readFile(url.replace('file://', ''), 'base64')

const fetchImageOuter = (url, type) =>
  RNFetchBlob.fetch('GET', url, {}).then(res => res.base64())

const fetchRecipients = () =>
  AsyncStorage.getItem('settings').then(res => JSON.parse(res));

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

const sendGmail = (user, token, contents) =>
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
