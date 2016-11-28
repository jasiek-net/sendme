'use strict'

import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

import {COL} from './Global';

export default class Empty extends Component {
	render() {
		return (
			<View style={s.cont}>
        <ActivityIndicator
          color={COL.green}
          size={'large'}
        />
			</View>);
	}
}

const s = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COL.bg,
  },

});