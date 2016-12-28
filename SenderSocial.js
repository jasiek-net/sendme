import {
  AsyncStorage,
} from 'react-native';

import {
  AccessToken,
} from 'react-native-fbsdk';


import {API} from './Global';

const parseFacebook = (photos) =>
	photos.map(p => ({}))


/* should return object
	res = {
		img: [
			{
				url: 'https://scontent.xx.fbcdn.net/v/t31.0-8/15385493_1685298704829134_4827555482980170699_o.jpg?oh=7faaae6d1136cef8089d88211e638c8c&oe=5924B829,
				name: '[SendMe][Facebook] title'
			}
		],
		usr: [
			{
				id: 23842398472323,
				time: 121276437280,
			}
		]
	}
*/

// what if empty???
const parseFacebookPhoto = (res) =>
	res.data.map(a => ({
		url: a.images[0].source,
		name: a.name
	}))

// what if empty???
const parseFacebookUser = (res, id) => ({
	id: id,
	time: Date.parse(res.data[0].created_time)
})

export const getFacebook = (users) =>
  AccessToken.getCurrentAccessToken()
  .then(res => {
    const token = res.accessToken;
		console.log('social first promise', res, users);
		const promises = [];
		for (let i = 0; i < users.length; i++) {
			console.log(API.FB_PHOTO(token, users[i]));
			promises.push(
				fetch(API.FB_PHOTO(token, users[i]))
				.then(res => res.json())
				.then(res => ({res: res, id: users[i]}))
			)
		}
		return Promise.all(promises)
		.then(res => {
			console.log('social sec promise', res)
			const result = {
				img:[],
				usr:[]
			};
			for (let i = 0; i < res.length; i++) {
				result.img.push(...parseFacebookPhoto(res[i].res));
				result.usr.push(parseFacebookUser(res[i].res, res[i].id));
			}
			console.log(result);
			return result;
		})
  })

