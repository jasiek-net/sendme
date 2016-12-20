import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { connect } from 'react-redux'

import Collapsible from 'react-native-collapsible';

import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from '../Global'

import {
  MenuButton,
  FootButton,
  RenderRow,
} from '../Partials'

class Visible extends Component {
  constructor(props) {
    super(props)
    this.state = { collapse: true }
  }

  render() {
    return (
      <View>
        <MenuButton
          text={this.props.text}
          call={() => this.setState({ collapse: !this.state.collapse })}
          iconLeft={this.props.icon}
          iconRight={this.state.collapse ? 'angle-down' : 'angle-up'}
        />
        <Collapsible collapsed={this.state.collapse} align="center">
          {this.props.list.map(a => (
            <RenderRow
              key={a.id}
              btn='REMOVE'
              text={a.data}
              call={this.props.remove.bind(null, a.id)}
            />
          ))}
          <FootButton
            call={this.props.add}
            text='ADD MORE'
            load={false} />
        </Collapsible>
      </View>
    )
  }
}

const state = (type, icon, text) => (state) => ({
  text,
  icon,
  list: state.settings[type],
})

const dispatch = (type) => (dispatch) => ({
  add: () => undefined,
  remove: () => undefined,
})

const Emails = connect(
  state('emails', 'envelope-o', 'Emails of recipients'),
  dispatch('emails'),
)(Visible)

const Hours = connect(
  state('hours', 'clock-o', 'Time of sending'),
  dispatch('hours')
)(Visible)

export { Emails, Hours }