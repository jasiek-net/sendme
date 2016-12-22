'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'

const Root = ({ store }) => (
  <Provider store={store}>
    <Navigator name="Photo" hideNavBar={true} />
  </Provider>
)

export default Root