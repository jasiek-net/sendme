'use strict'

import { connect } from 'react-redux'
import * as fbActions from './facebook/Actions'
import * as inActions from './instagram/Actions'
import * as gmActions from './gmail/Actions'
import Social from './Social'

const states = (state, props) => ({
    view: state[props.type].view,
    user: state[props.type].user,
    
    friends: state[props.type].friends,
    next: state[props.type].next,
    
    icon: props.icon,
    type: props.type,
    nav: props.nav,
  })

export const Facebook = connect(
	states,
	fbActions
)(Social)

export const Instagram = connect(
	states,
	inActions
)(Social)

export const Gmail = connect(
	states,
	gmActions
)(Social)