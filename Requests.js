import Keychain from 'react-native-keychain';
import { AccessToken } from 'react-native-fbsdk'
import { API } from './Global'

export const fetchData = (store) => {
	fetchFacebook(store.getState().facebook, store.dispatch);
	fetchInstagram(store.getState().instagram, store.dispatch);
}

export const fetchFacebook = (state, dispatch) => {
	if (typeof state.next === 'undefined') {
		return null
	}
  AccessToken.getCurrentAccessToken()
  .then(res => {

    var reg = /access_token=.*?(&|$)/;
    var newToken = `access_token=${res.accessToken}&`;
    const next = state.next.replace(reg, newToken);

    console.log('requst for ', next);
    fetch(next)
    .then(res => res.json())
    .then(res => {
    	console.log('Facebook fetched ', res);
      const friends = res.data.map(a => {
        return {
          name: a.name,
          foot: a.id,
          add: state.follows.indexOf(a.id) > -1,
          img: a.picture.data.url,
          id: a.id
        }
      });
      dispatch({
        type: 'FB_FETCH',
        list: friends,
        next: res.paging.next,
      })
    })
    .catch(err => console.log('Facebook: fetch friends ', err))
  })
  .catch(err => console.log('Facebook AccessToken ', err));
}

export const fetchInstagram = (state, dispatch) => {
  if (typeof state.next === 'undefined') {
    return null
  }
  Keychain.getInternetCredentials('instagram')
  .then(sec => {
    var token = sec.password
    var api = API.IN_friends + token;
    fetch(api)
    .then(res => res.json())
    .then(res => {
    	console.log('insta fetch');
    	console.log(res);
      var friends = res.data.map(a => {
        return {
          name: a.username,
          foot: a.full_name,
          add: state.follows.indexOf(a.id) > -1,
          img: a.profile_picture,
          id: a.id
        }
      });
      dispatch({
      	type: 'IN_FETCH',
      	list: friends,
      	next: 'blabla'
      })
    })
    .catch(err => console.log('Instagram: fetch friends ', err));
  })
  .catch(err => {
    console.log('Keychain: no credentials ', err);
  });
}