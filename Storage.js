import {
  AsyncStorage,
  NetInfo,
} from 'react-native'

import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux'

import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

import throttle from 'lodash/throttle'
import * as Reducers from './Reducers'

import { fetchData } from './Requests'
import { API } from './Global'

export const pureState = () => {
  const state = {
    facebook: {
      friends: [],
      follows: [],
      next: null,
      view: 'empty',
      user: null,
    },
    instagram: {
      friends: [],
      follows: [],
      next: null,
      view: 'empty',
      user: null,
    },
    gmail: {
      friends: [],
      follows: [],
      next: null,
      view: 'empty',
      user: null,
    },
    settings: {
      emails: [
        {
          data: 'jan.horubala@gmail.com',
          id: 1,
        },
        {
          data: 'ola.dolot@op.pl',
          id: 2,
        },
        {
          data: 'franciszek@mixbox.pl',
          id: 3,
        }
      ],
      hours: [
        {
          data: '12:30',
          id: 1,
        },
        {
          data: '13:45',
          id: 2,
        },
        {
          data: '15:35',
          id: 3,
        }
      ],
      view: 'empty',
    }
  }
  return state;
}

const loadState = (store) => {
  AsyncStorage.getItem('store')
  .then(res => JSON.parse(res))
  .then(res => {
    if (res && res.facebook) {
      store.dispatch({
        type: 'FACEBOOK_FOLLOWS',
        list: res.facebook,
      });
    }
    if (res && res.instagram) {  
      store.dispatch({
        type: 'INSTAGRAM_FOLLOWS',
        list: res.instagram,
      });
    }
  })
  .catch(err => console.log('AsyncStorage.getItem ', err))
}

const saveState = (store) => 
  throttle(() => {
    const state = store.getState();
    const data = {
      facebook: state.facebook.follows,
      instagram: state.instagram.follows,
    }
    AsyncStorage.setItem('store', JSON.stringify(data))
    .catch(err => console.log('AsyncStorage.setItem ', err))
  }, 1000)

export const configureStore = () => {

  // NetInfo.fetch().then(is => {
  //   console.log('NetInfo ', typeof is);
  // });

  const reducers = combineReducers(Reducers)

  const middlewares = [thunk, promise, createLogger()]
  
  const store = createStore(
    reducers,
    pureState(),
    applyMiddleware(...middlewares)
  );

  // loadState(store);

  store.subscribe(saveState);

  return store
}

// const delay = ms =>
//   new Promise(resolve => setTimeout(resolve, ms))

// const addLogginToDispatch = (store) => {
//   const rawDispatch = store.dispatch;
//   if (!console.group) {
//     return rawDispatch
//   }

//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: grey', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnValue = rawDispatch(action);
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   }
// }

// const addProimiseSupportToDispatch = (store) => {
//   const rawDispatch = store.dispatch;
//   return (action) => {
//     if (typeof action.then === 'function') {
//       return action.then(rawDispatch);
//     }
//     return rawDispatch(action)
//   }
// }