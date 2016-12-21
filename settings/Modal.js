import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Alert,
  DatePickerIOS,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Modal from 'react-native-simple-modal'

import { COL, SIZ } from '../Global'

const s = StyleSheet.create({
  head: {
    fontSize: 20,
    textAlign: 'center',
    color: COL.bg,
  },
  buttons: {
    height: 35,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  yes: {
    fontSize: 20,
    borderColor: COL.green,
    color: COL.green,
  },
  no: {
    fontSize: 20,
    borderColor: COL.bg,
    color: COL.bg,
  },
})

export class ModalHour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      open: false,
    }
    this.save = this.save.bind(this)
    this.onDateChange = this.onDateChange.bind(this);
  }
  open() {
    this.setState({open: true})
  }
  onDateChange(date) {
    this.setState({date})
  }
  parseDate(date) {
    return date.getHours() + ':' + date.getMinutes()
  }
  save() {
    this.setState({open: false});
    this.props.add(this.parseDate(this.state.date));
  }

  render() {
    return (  
      <Modal
        open={this.state.open}
        closeOnTouchOutside={true}>
        <Text style={s.head}>Set hour of sending photos!</Text>
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          minuteInterval={1}
          onDateChange={this.onDateChange}
        />
        <View style={s.buttons}>
          <TouchableOpacity
            style={[s.btn, {borderColor: COL.bg}]}
            onPress={() => this.setState({open: false})}>
            <Text style={s.no}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, {borderColor: COL.green}]} 
            onPress={this.save}>
            <Text style={s.yes}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

export class ModalEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      open: false,
    }
    this.save = this.save.bind(this)
    this.onDateChange = this.onDateChange.bind(this);
  }
  open() {
    this.setState({open: true})
  }
  onDateChange(data) {
    this.setState({data})
  }
  save() {
    this.setState({
      open: false,
      data: ''
    });
    this.props.add(this.state.data);
  }

  render() {
    return (  
      <Modal
        open={this.state.open}
        closeOnTouchOutside={true}>
        <Text style={s.head}>Add new recipient!</Text>
        <View style={{
          height: 100,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TextInput
            keyboardType='email-address'
            numberOfLines={1}
            placeholder='email@example.com'
            onEndEditing={this.save}
            style={{
              textAlign: 'center',
              fontSize: 30,
              height: 40,
            }}
            value={this.state.data}
            onChangeText={this.onDateChange}
          />
        </View>
        <View style={s.buttons}>
          <TouchableOpacity
            style={[s.btn, {borderColor: COL.bg}]}
            onPress={() => this.setState({open: false})}>
            <Text style={s.no}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, {borderColor: COL.green}]} 
            onPress={this.save}>
            <Text style={s.yes}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}
