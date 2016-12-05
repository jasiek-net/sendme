import { createStore } from 'redux';

const counter = (state = 0, action) => {
	switch(action.type) {
		case: 'inc':
			return state + 1
		case 'dec':
			return state - 1
		default:
			return state
	}
}

const store = createStore(counter);

console.log(store.getState());

store.dispatch({type: 'inc'})

store.subscribe(() => {
	document.body = store.getState()
})


import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';




