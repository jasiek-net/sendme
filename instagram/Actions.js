import Keychain from 'react-native-keychain'
import { API, SIZ } from '../Global'

import * as api from './API'

const receiveFriends = (friends, next) => ({
  type: 'INSTAGRAM_FRIENDS',
  list: friends,
  next: next,
});

const receiveUser = (user) => ({
  type: 'INSTAGRAM_USER',
  data: user,
});

const throwLogout = (err) => ({ type: 'INSTAGRAM_LOGOUT', msg: err })
const throwWaiting = () => ({ type: 'INSTAGRAM_WAITING' })

export const toggleFriend = (id) => ({
    type: 'INSTAGRAM_TOGGLE_FRIEND',
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

// Login - Logout - Logic

const WebView = (url, handler) => ({
    name: 'WebView',
    title: 'Instagram Login',
    props: {
      source: { uri: url },
      onNavigationStateChange: handler,
      style: { marginTop: SIZ.navall }
    }
})

const handleLogin = (nav, dispatch) => (event) => {
  let url = event.url;
  if (url && url.indexOf('#') > -1) {
    nav.pop();
    var user = 'username';
    var pass = url.split('#access_token=')[1];
    Keychain.setInternetCredentials('instagram', user, pass)
    .then(res => fetchData()(dispatch))
    .catch(err => dispatch(throwLogout()));
  }
}

export const login = (nav) => (dispatch) => {
  dispatch(throwWaiting());
  nav.push(
    WebView( API.IN_LOGIN, handleLogin(nav, dispatch))
  );
}

const handleLogout = (nav, dispatch) => (event) => {
  // we call in webview https://instagram.com/accounts/logout to logout
  // then we are redirect to https://www.instagram.com/ and we end
  let url = event.url;
  if (url && url.indexOf('logout') === -1) {
    nav.pop();
    Keychain.resetInternetCredentials('instagram')
    .then(res => dispatch(throwLogout()))
    .catch(err => console.log('Keychain error', err));
  }
}

export const logout = (nav) => (dispatch) => {
  dispatch(throwWaiting());
  nav.push(
    WebView( API.IN_LOGOUT, handleLogout(nav, dispatch) )
  );
}
