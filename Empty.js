'use strict'

import React, {Component} from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import {COL} from './Global';

export default class Empty extends Component {
  shouldComponentUpdate() {
    return false;
  }

	render() {
		return (
			<View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COL.bg,        
      }}>
        <ActivityIndicator
          color={COL.green}
          size={'large'}
        />
			</View>);
	}
}