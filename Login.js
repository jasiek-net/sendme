'use strict'

import React, {Component} from 'react';
import {
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COL, SIZ} from './Global';

export default class Login extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
      <View style={{
      	flex: 1,
		    flexDirection: 'column',
		    alignItems: 'center',
		    justifyContent: 'center',
		    backgroundColor: COL.bg,
			}}>
				<TouchableHighlight
					underlayColor='transparent' 
					onPress={this.props.call}>
					<View>
					  <Icon name={this.props.icon}
		          size={SIZ.header}
		          color={COL.txt}
		          backgroundColor='transparent'/>
		         <Text style={{
		         	borderWidth: 1,
		         	borderRadius: 10,
		         	borderColor: COL.txt,
		         	padding: 10,
		         	textAlign: 'center',
		         	color: COL.txt}}>
	          	{'Login with ' + this.props.type}
		         </Text>
					</View>
				</TouchableHighlight>
      </View>);
	}
}