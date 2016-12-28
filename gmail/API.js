
import { GoogleSignin } from 'react-native-google-signin'
import { API } from '../Global'

const parseUser = (res) => ({
	name: res.name,
	foot: res.email,
	img: res.photo,
	add: false,
})

const parseFriends = (res) =>
	res.data.map(a => ({
			name: a,
			foot: a,
			add: false,
			img: a,
			id: a,
		})
	)

export const login = () =>
	new Promise((res, rej) =>
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.configure(API.GM_CONFIG)
			.then(() => {
				GoogleSignin.signIn()
				.then(usr => {
					console.log('signIn ', usr);
					res(parseUser(usr))
				})
				.catch(rej)
			})
			.catch(rej)
		})
		.catch(rej)
	)

export const logout = () => GoogleSignin.signOut()

export const fetchUser = () =>
	new Promise((res, rej) =>
		GoogleSignin.configure(API.GM_CONFIG)
		.then(() => {
			GoogleSignin.currentUserAsync()
			.then(usr => {
				console.log('Gmail fetchUser ', usr);
				if (usr === null) {
					rej('Gmail fetchUser fail');
				} else {
					res(parseUser(usr))
				}
			})
			.catch(rej)
		})
		.catch(rej)
	)

export const fetchFriends = () => undefined
