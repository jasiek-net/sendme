'use strict'

import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { API } from '../Global'

const parseFriends = (res) =>
  res.data.map(a => ({
      name: a.name,
      foot: a.email ? a.email : a.id,
      add: false,
      img: a.picture.data.url,
      id: a.id
    })
  )

const parseUser = (res) => {
  console.log(res);
  return ({
  name: res.name,
  foot: res.email ? res.email : res.id,
  add: false,
  img: res.picture.data.url,
  id: res.id,
})
}

const refreshToken = (url, token) => {
  url = url ? url : API.FB_friends;
  const reg = /access_token=.*?(&|$)/;
  const newToken = `access_token=${token}&`;
  return url.replace(reg, newToken);  
}

export const login = () =>
  LoginManager.logInWithReadPermissions(['user_friends', 'user_photos'])
  .then(res => {
    if (res.isCancelled) {
      throw 'Facebook login cancelled'
    }
  })

export const logout = () => LoginManager.logOut()

export const fetchFriends = (next) =>
  AccessToken.getCurrentAccessToken()
  .then(res => {
    const url = refreshToken(next, res.accessToken)

    return fetch(url)
    .then(res => res.json())
    .then(res => ({
        friends: parseFriends(res),
        next: res.paging.next
      })
    )
  })

export const fetchUser = () => 
  AccessToken.getCurrentAccessToken()
  .then(res => {
    const url = API.FB_user + res.accessToken;

    return fetch(url)
    .then(res => res.json())
    .then(parseUser)
  })
