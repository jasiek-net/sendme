
import {
  AsyncStorage,
} from 'react-native';

import {GoogleSignin} from 'react-native-google-signin';
import RNFetchBlob from 'react-native-fetch-blob';

// import mailcomposer from 'mailcomposer';

import {API} from './Global';
import {encode} from 'base-64'

import {
  getFacebook
} from './SenderSocial';


// const check = () => {
//   return new Promise((res, rej) => setTimeout(() => {console.log('first pro'); res()}, 1000)).then(() => {
//     return new Promise((res,rej) => setTimeout(() => {console.log('sec pro'); res()}, 100))
//   })
// }

// let co = check()
// co.then(() => console.log('third promise'));

export const sendAllPhotos = () => 
    Promise.all([
      fetchGmailUser(),
      fetchRecipients(),
      fetchSocials(),
    ])
    .then(([
      user,
      recip,
      store,
    ]) => {
      const pass = user.accessToken;
      const userId = user.id;
      console.log('first Promise.all ', user, recip, store);
      return Promise.all([
        getFacebook(store.facebook),
        // getInstagram(store.instagram),
      ])
      .then(([
        fb,
        ig
      ]) => {
        console.log('second Promise.all', fb);
      })
    })

const fetchSocials = () =>
  AsyncStorage.getItem('store')
  .then(res => JSON.parse(res))

const sendFromNetwork = (userId, pass, recip) => (image) => {
  fetchImageOuter(image)
  .then(img => {
    const mail = createMail(recip, img, '[SendMe] facebook')
    sendGmail(userId, pass, mail)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}


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
      var mail = createMail(recip, image, '[SendMe] Photo from device')
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

const fetchImageOuter = (url) =>
  RNFetchBlob.fetch('GET', url, {}).then(res => res.base64())

const fetchRecipients = () =>
  AsyncStorage.getItem('settings').then(res => {
    var data = JSON.parse(res);
    if (data === null || data.emails === undefined || data.emails.length === 0) {
      throw 'Emails list is empty!'      
    } else {
      var recip = data.emails.reduce((a, b) => a + b.data + ', ', '')
      return recip
    }
  });

const createMail = (emails, img, title) => {
    var boundary = Date.now()
    console.log('send to ', emails);
    return encode(
      "MIME-Version: 1.0\n" +
      "Subject: " + title + "\n" +
      // "To: ramkazoome@gmail.com\n" +
      "Bcc: " + emails + "\n" + 
      "Content-Type: multipart/mixed; boundary=" + boundary + "\n\n" +

      // "--foo_bar_baz\n" + 
      "Content-Type: text/plain; charset=\"UTF-8\"\n\n" +
      "The actual message text goes here" + 

      "\n\n--" + boundary + "\n" + 
      // "Content-Type: image/jpeg;\n" + 
      // "MIME-Version: 1.0\n" + 
      // "Content-Disposition: attachment; filename=\"photo.jpg\"\n" + 
      // "Content-Transfer-Encoding: base64\n\n" + 
      // img + 
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
