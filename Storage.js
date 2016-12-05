import { AsyncStorage } from 'react-native';
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
  console.log('loadState ', state);
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