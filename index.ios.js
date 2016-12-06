'use strict'

import React from 'react'
import { AppRegistry } from 'react-native'
import { configureStore } from './Storage'
import Root from './Root'

const store = configureStore();

const SendMe = () => (<Root store={ store } />)

AppRegistry.registerComponent('SendMe', () => SendMe);
