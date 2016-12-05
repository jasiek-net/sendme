'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';


import { createStore } from 'redux';

// import { Provider } from 'react-redux';

import { connect } from 'react-redux';


const store = createStore(counter);

store.dispatch({ type: 'inc' })

const mapStateToProps = (state) => {
	return {
		state,
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onPress: () => {
// 			dispatch({
// 				type: 'inc'
// 			})
// 		}
// 	}
// }

const mapDispatchToProps = (dispatch) => ({
	onPress() {
		dispatch({
			type: 'inc'
		})
	}	
})


const Comp = (props) => {
		return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text onPress={props.onPress} style={{fontSize: 40}}>
				{props.state}
			</Text>
		</View>)
}

const Test = connect(
	mapStateToProps,
	mapDispatchToProps
)(Comp);

export default Test;

// export default class Test extends Component {
// 	componentDidMount() {
// 		store.subscribe(() => {
// 			this.forceUpdate();
// 		})
// 	}

// 	onPress() {
// 		console.log('onPress');
// 		store
// 	}

// 	render() {
// 		const props = this.props;
// 		const state = store.getState();

// 		return (
// 		)
// 	}
// }

