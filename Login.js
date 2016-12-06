'use strict'

import React, { PropTypes } from 'react';
import {
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COL, SIZ } from './Global';

const s = StyleSheet.create({
	con: {
  	flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COL.bg,
	},
	txt: {
   	color: COL.txt,
   	textAlign: 'center',
   	fontSize: 20,
   	padding: 10,
   	borderWidth: 1,
   	borderRadius: 10,
   	borderColor: COL.txt,
	},

})

const Login = ({ 
	icon,
	type,
	login,
}) => (
  <View style={s.con}>
		<TouchableHighlight
			underlayColor='transparent'
			onPress={login}>
			<View>
			  <Icon
			  	name={icon}
          size={SIZ.login}
          color={COL.txt}
          backgroundColor='transparent'/>
         <Text style={s.txt}>
        	{'Login with ' + type}
         </Text>
			</View>
		</TouchableHighlight>
  </View>
)

Login.propTypes = {
	icon: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	login: PropTypes.func.isRequired,
}

export default Login