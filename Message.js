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

const Message = ({ 
	icon,
	press,
	children,
}) => (
	<View style={s.con}>
		<TouchableHighlight
			underlayColor='transparent'
			onPress={press}>
			<View>
				<Icon
					name={icon}
					size={SIZ.login}
					color={COL.txt}
					backgroundColor='transparent' />
					<Text style={s.txt}>
						{ children }
					</Text>
			</View>
		</TouchableHighlight>
	</View>
)

Message.propTypes = {
	icon: PropTypes.string.isRequired,
	press: PropTypes.func.isRequired,
}

export default Message