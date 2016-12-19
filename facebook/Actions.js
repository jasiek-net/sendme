import * as api from './API';

const receiveFriends = (friends, next) => ({
	type: 'FACEBOOK_FRIENDS',
	list: friends,
	next: next,
});

const receiveUser = (user) => ({
	type: 'FACEBOOK_USER',
	data: user,
});

const throwLogout = (err) => ({ type: 'FACEBOOK_LOGOUT', msg: err })
const throwWaiting = () => ({ type: 'FACEBOOK_WAITING' })


export const toggleFriend = (id) => ({
		type: 'FACEBOOK_TOGGLE_FRIEND',
		id,
	})

export const fetchData = () => (dispatch) => {
	dispatch(fetchUser())
	dispatch(fetchFriends())
}

export const fetchFriends = (next) =>
	api.fetchFriends(next)
	.then(res => 
		receiveFriends(res.friends, res.next))
	.catch(err => 
		throwLogout(err))

const fetchUser = () => 
	api.fetchUser().then(res => {
		console.log('fetchUser', res);
		return receiveUser(res)
	})
	.catch(err => throwLogout(err))

export const login = () => (dispatch) => {
	dispatch(throwWaiting())
	api.login()
	.then(() => fetchData()(dispatch))
	.catch(err => dispatch(throwLogout(err)))
}

export const logout = () => (dispatch) => {	
	api.logout()
	dispatch(throwLogout());
}