import Keychain from 'react-native-keychain';
import { API } from './Global'

export const fetchData = (store) => {
	// fetchFacebook(store.getState().facebook, store.dispatch);
  // fetchUserFacebook(store.getState.facebook, store.dispatch);
	fetchInstagram(store.getState().instagram, store.dispatch);
}

export const fetchInstagram = (state, dispatch) => {
  if (typeof state.next === 'undefined') {
    return null
  }
  Keychain.getInternetCredentials('instagram')
  .then(sec => {
    const next = state.next === API.IN_FIRST ? (API.IN_friends + sec.password) : state.next
    console.log('INSTA request ', next);
    fetch(next)
    .then(res => res.json())
    .then(res => {
    	console.log('INSTA fetch');
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
      	next: res.pagination.next_url,
      })
    })
    .catch(err => console.log('Instagram: fetch friends ', err));
  })
  .catch(err => {
    console.log('Keychain: no credentials ', err);
  });
}