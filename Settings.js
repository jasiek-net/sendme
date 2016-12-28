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

import {
  sendAllPhotos
} from './Sender';

class Settings extends Component {
  
  constructor(props) {
    super(props)
    this.state = {sync: false}
    this.sync = this.sync.bind(this);
    this.remove = this.remove.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.removeHour = this.removeHour.bind(this);
    console.log(props);
  }

  componentDidMount() {
    // this.refs.emails.open()
  }

  sync() {
    this.setState({sync: true})
    sendAllPhotos()
    .then(() => this.setState({sync: false}))
    .catch(err => {
      Alert.alert('Error!!!', 'nonewodnweo')
      console.log('error sending', err)
    });
  }

  remove(text, call) {
    Alert.alert(
      `Removing ${text}`,
      `Are you sure you want to remove ${text}?`,
      [
        { text: 'Yes', onPress: call},
        { text: 'No' }
      ]
    )
  }

  removeEmail(a) {
    this.remove(a.data, this.props.removeEmail.bind(null, a.id))
  }

  removeHour(a) {
    this.remove(a.data, this.props.removeHour.bind(null, a.id))
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
        text='Emails of recipients'
        icon='envelope-o'
        list={this.props.emails}
        add={() => this.refs.emails.open()}
        remove={this.removeEmail}
      />
      <Collapsible
        text='Time of sending'
        icon='clock-o'
        list={this.props.hours}
        add={() => this.refs.hours.open()}
        remove={this.removeHour}
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

const dispatch = (dispatch) => ({
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

export default connect(state, dispatch)(Settings)