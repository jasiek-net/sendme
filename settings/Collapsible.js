import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  DatePickerIOS,
  View,
} from 'react-native'

import Collapsible from 'react-native-collapsible';

import Icon from 'react-native-vector-icons/FontAwesome'

import {
  MenuButton,
  FootButton,
  RenderRow,
} from '../Partials'

export default class CustomCollapsible extends Component {

  constructor(props) {
    super(props);
    this.state = {collapsed: true};
    console.log('Collapsible ', props)
  }

  render() {
    return (
      <View>
        <MenuButton
          text={this.props.text}
          iconLeft={this.props.icon}
          call={() => this.setState({collapsed: !this.state.collapsed})}
          iconRight={this.state.collapsed ? 'angle-down' : 'angle-up'}
        />
        <Collapsible collapsed={this.state.collapsed} align="center">
          {this.props.list.map(a => (
            <RenderRow
              key={a.id}
              btn='REMOVE'
              text={a.data}
              call={() => this.props.remove(a)}
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

CustomCollapsible.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}