'use strict'

import { API } from '../Global'
import Keychain from 'react-native-keychain'

const parseFriends = (res) =>
	res.data.map(a => ({
			name: a.username,
			foot: a.full_name,
			add: false,
			img: a.profile_picture,
			id: a.id
		})
	)


export const fetchUser = () => 
	Keychain.getInternetCredentials('instagram')
	.then(sec => {
		const url = API.IN_user + sec.password;

		return fetch(url)
		.then(res => res.json())
		.then(res => ({
			name: res.data.full_name,
			foot: res.data.username,
			img: res.data.profile_picture
		}))
	})

export const fetchFriends = (next) =>
	Keychain.getInternetCredentials('instagram')
	.then(sec => {
		const url = next ? next : API.IN_friends + sec.password;

		return fetch(url)
		.then(res => res.json())
		.then(res => ({
				friends: parseFriends(res),
				next: res.pagination.next_url,
			})
		)
	})


	// 	.catch(err => {
	// 		console.log('Instagram: fetch friends ', err)
	// 		throw 'network'
	// 	});
	// })
	// .catch(err => {
	// 	console.log('Keychain: no credentials ', err);
	// 	throw 'login'
	// });
