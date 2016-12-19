import * as api from './API';

const throwLogout = (err) => ({ type: 'GMAIL_LOGOUT', msg: err })
const throwWaiting = () => ({ type: 'GMAIL_WAITING' })

const receiveFriends = (friends, next) => ({
	type: 'GMAIL_FRIENDS',
	list: friends,
	next: next,
});

const receiveUser = (user) => ({
	type: 'GMAIL_USER',
	data: user,
});

const fetchUser = () => (dispatch) =>
	api.fetchUser()
	.then(res => {
		dispatch(receiveUser(res))
	})
	.catch(err => {
		dispatch(throwLogout(err))
	})

export const fetchData = () => (dispatch) => {
	fetchUser()(dispatch)
	// fetchFriends()
	// dispatch(throwLogout())
}

export const toggleFriend = () => {}

export const fetchFriends = (next) =>
	api.fetchFriends(next)
	.then(res => 
		receiveFriends(res.friends, res.next))
	.catch(err => 
		throwLogout(err))

export const login = () => (dispatch) => {
	dispatch(throwWaiting())
	api.login()
	.then(res => {
		console.log('login ', res);
		dispatch(receiveUser(res))
	})
	.catch(err => dispatch(throwLogout(err)))
}

export const logout = () => (dispatch) => {	
	api.logout()
	dispatch(throwLogout())
}
