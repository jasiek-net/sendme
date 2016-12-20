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

import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from './Global'

import {
  Hours,
  Emails,
} from './settings/Collapsible';

const s = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COL.bg,
    paddingTop: SIZ.navall,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
  },
  info: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  head: {
    fontSize: 20,
    color: COL.btn_head,
    // color: COL.btn_foot,
  },
  foot: {
    color: COL.btn_foot,
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
  buttonArrow: {
    color: COL.btn_txt,
    fontSize: 20,
    width: 20,
    textAlign: 'center',
  },
});

const Settings = () => (
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
    <Emails />
    <Hours />
  </ScrollView>
)

Settings.propTypes = {}

export default Settings