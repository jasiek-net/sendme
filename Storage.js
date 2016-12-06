import { AsyncStorage } from 'react-native'

import {
  combineReducers,
  createStore,
} from 'redux'


import throttle from 'lodash/throttle'

import { facebook, instagram } from './Reducers'
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

export const loadAsync = async (dispatch) => {
  const data = await AsyncStorage.getItem('store');
  const store = JSON.parse(data);
  console.log('loadAsync ', store);
  if (store && store.facebook) {
    dispatch({
      type: 'INIT_FACEBOOK',
      list: store.facebook,
    });
  }
  if (store && store.instagram) {  
    dispatch({
      type: 'INIT_INSTAGRAM',
      list: store.instagram,
    });
  }
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

  return store
}




