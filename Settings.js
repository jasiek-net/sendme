import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'


import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from './Global'

import Collapsible from './settings/Collapsible';
import { ModalEmail, ModalHour } from './settings/Modal';

const s = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COL.bg,
    paddingTop: SIZ.navall,
  },
  button: {
    padding: 14,
    backgroundColor: COL.btn_bg,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: COL.btn_head,
    fontSize:20,
    flex: 1,
  },
  buttonIcon: {
    color: COL.btn_txt,
    fontSize: 20,
    textAlign: 'center',
    width: 30,
    marginRight: 10,
  },
});

class Settings extends Component {
  
  constructor(props) {
    super(props)
    this.remove = this.remove.bind(this);
    this.openEmails = this.openEmails.bind(this);
    this.openHours = this.openHours.bind(this);
  }

  componentDidMount() {
    // this.refs.emails.open()
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
  openEmails() { this.emails.open() }
  openHours() {
    console.log(this.hours);
    this.hours.open()
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView style={s.cont}>
      <TouchableHighlight onPress={() => undefined} style={s.button}>
        <View style={s.buttonView}>
          <Icon style={s.buttonIcon} name="paper-plane"/>
          <Text style={s.buttonText}>
            Send photos
          </Text>
          <ActivityIndicator
            color={COL.btn_txt}
            size="small"
            animating={false}
            hidesWhenStopped={false}
          />
        </View>
      </TouchableHighlight>
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