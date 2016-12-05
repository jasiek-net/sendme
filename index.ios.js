'use strict'

import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
} from 'react-native'

import throttle from 'lodash/throttle'

// REDUX
import {
  combineReducers,
  createStore,
} from 'redux'

import {
  Provider,
  connect
} from 'react-redux';

import Main from './Main'
import { loadState, saveState } from './Storage'
import { facebook, instagram } from './Reducers'

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

const SendMe = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

AppRegistry.registerComponent('SendMe', () => SendMe);
