'use strict'

import { connect } from 'react-redux'
import * as fbActions from './facebook/Actions'
import * as inActions from './instagram/Actions'
import * as gmActions from './gmail/Actions'
import Social from './Social'

const states = (type, icon) => (state, props) => ({
    icon,
    type,

    view: state[type].view,
    user: state[type].user,
    
    friends: state[type].friends,
    next: state[type].next,
    
    nav: props.nav,
  })

export const Facebook = connect(
	states("facebook", "facebook-square"),
	fbActions
)(Social)

export const Instagram = connect(
	states("instagram", "instagram"),
	inActions
)(Social)

export const Gmail = connect(
	states("gmail", "google-plus-square"),
	gmActions
)(Social)