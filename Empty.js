'use strict'

import React from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';

import {COL} from './Global';

const Empty = () => (
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
	</View>
);

export default Empty