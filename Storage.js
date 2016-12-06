import { AsyncStorage } from 'react-native'

import {
  combineReducers,
  createStore,
} from 'redux'

import throttle from 'lodash/throttle'
import { facebook, instagram } from './Reducers'
import { fetchData } from './Requests';
import { API } from './Global'

export const loadState = () => {
  const state = {
    facebook: {
      friends: [],
      follows: [],
      next: API.FB_friends
    },
    instagram: {
      friends: [],
      follows: [],
      next: API.IN_friends,
    },
  }
  return state;
}

export const loadAsync = async (store) => {
  console.log('loadAsync triggered');
  var data = await AsyncStorage.getItem('store');
  data = JSON.parse(data);
  if (data && data.facebook) {
    store.dispatch({
      type: 'INIT_FACEBOOK',
      list: data.facebook,
    });
  }
  if (data && data.instagram) {  
    store.dispatch({
      type: 'INIT_INSTAGRAM',
      list: data.instagram,
    });
  }
  console.log('load AsyncStorage');
  await fetchData(store);
  return 'HURRA!'
}

export const saveState = async (data) => {
  try {
    const store = JSON.stringify(data)
    await AsyncStorage.setItem('store', store);
    console.log('saveState success ', store);
  } catch (err) {
    console.log('saveState error ', err);
  }
}

export const configureStore = () => {

  const reducers = combineReducers({
    facebook,
    instagram
  })
  
  const store = createStore(reducers, loadState());

  store.subscribe(throttle(() => {
    const state = store.getState();
    saveState({
      facebook: state.facebook.follows,
      instagram: state.instagram.follows,
    });
  }, 1000));

  loadAsync(store).then(res => console.log('End of fetching data!!!', res));

  return store
}




