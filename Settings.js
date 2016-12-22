import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from './Global'

import Collapsible from './settings/Collapsible';
import { ModalEmail, ModalHour } from './settings/Modal';
import { MenuButton } from './Partials';

class Settings extends Component {
  
  constructor(props) {
    super(props)
    this.state = {sync: false}
    this.sync = this.sync.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    // this.refs.emails.open()
  }

  sync() {
    this.setState({sync: true})
    setTimeout(() => this.setState({sync: false}), 2000);
  }

  remove(type, a) {
    Alert.alert(
      `Removing ${a.data}`,
      `Are you sure you want to remove ${a.data}?`,
      [
        { text: 'Yes', onPress: () => {
            if (type === 'emails') {
              this.props.removeEmail(a.id)
            }
            if (type === 'hours') {
              this.props.removeHour(a.id)
            }
          }
        },
        { text: 'No' }
      ]
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COL.bg,
        paddingTop: SIZ.navall,
      }}>
      <MenuButton
        text='Send photos now'
        iconLeft='paper-plane'
        call={this.sync}
        itemRight={
          <ActivityIndicator
            color={this.state.sync ? COL.green : COL.btn_txt}
            size="small"
            animating={this.state.sync}
            hidesWhenStopped={false}
          />          
        }
      />
      <Collapsible
        type='emails'
        text='Emails of recipients'
        icon='envelope-o'
        list={this.props.emails}
        add={() => this.refs.emails.open()}
        remove={this.remove}
      />
      <Collapsible
        type='hours'
        text='Time of sending'
        icon='clock-o'
        list={this.props.hours}
        add={() => this.refs.hours.open()}
        remove={this.remove}
      />
    </ScrollView>
    <ModalEmail
      ref='emails'
      add={this.props.addEmail} />
    <ModalHour
      ref='hours'
      add={this.props.addHour} />
    </View>)
  }
}

const state = (state) => ({
  hours: state.settings.hours,
  emails: state.settings.emails,
})

const dispatch = (type) => (dispatch) => ({
  addEmail: (email) => dispatch({
    type: 'ADD_EMAIL',
    data: email,
  }),
  addHour: (hour) => dispatch({
    type: 'ADD_HOUR',
    data: hour
  }),
  removeEmail: (id) => dispatch({
    type: 'REMOVE_EMAIL',
    data: id,
  }),
  removeHour: (id) => dispatch({
    type: 'REMOVE_HOUR',
    data: id,    
  })
})


export default connect(
  state,
  dispatch
)(Settings)