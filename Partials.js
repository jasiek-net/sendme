import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from './Global'

const s = StyleSheet.create({
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
  text: {
    color: COL.btn_head,
    fontSize:20,
    flex: 1,
  },
  iconLeft: {
    color: COL.btn_txt,
    fontSize: 20,
    textAlign: 'center',
    width: 30,
    marginRight: 10,
  },
  iconRight: {
    color: COL.btn_txt,
    fontSize: 20,
    width: 20,
    textAlign: 'center',
  },
});

const MenuButton = ({ 
  text,
  call,
  iconLeft,
  iconRight,
  itemRight,
}) => (
  <TouchableOpacity onPress={call} style={s.button}>
    <View style={s.buttonView}>
      <Icon style={s.iconLeft} name={iconLeft} />
      <Text style={s.text}>
        { text }
      </Text>
      {itemRight !== undefined ?
        itemRight
        :
        <Icon style={s.iconRight} name={iconRight}/>
      }
    </View>
  </TouchableOpacity>
);

const FootButton = ({
	text,
	load,
	call
}) => (
  <View style={{
  	flexDirection: 'row',
    alignItems: 'center',
  	justifyContent: 'center',
    padding: 10,
    height: 60,
    backgroundColor: COL.bg,
  }}>
    {load ? 
      (<ActivityIndicator color={COL.green} />)
    :
      (<TouchableOpacity
        style={{
        	borderWidth: 1,
			    padding: 3,
			    paddingLeft: 5,
			    paddingRight: 5,
			    borderRadius: 3,
        	borderColor: COL.green,
        }}
        onPress={call}>
        <Text style={{color: COL.green}}>
          { text }
        </Text>
      </TouchableOpacity>)
    }
  </View>
)

const sRow = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
    backgroundColor: COL.bg,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  info: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  head: {
    fontSize: 20,
    color: COL.btn_head,
  },
  foot: {
    color: COL.btn_foot,
  },
  btn: {
    borderWidth: 1,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
  },
  followBtn: {
    borderColor: COL.btn_head,
  },
  followTxt: {
    color: COL.btn_head,
  },
  unfollowBtn: {
    backgroundColor: COL.btn_foot,
  },
  unfollowTxt: {
    color: COL.btn_bg,
  },
});

const RenderRow = ({
	btn,
	text,
	call,
}) => (
  <View style={sRow.row}>
    <View style={sRow.info}>
      <Text style={sRow.head} numberOfLines={1}>
        { text }
      </Text>
    </View>
    <TouchableOpacity onPress={call}>
      <View style={[sRow.btn, sRow.followBtn]}>
        <Text style={sRow.followTxt}>
          { btn }
        </Text>
      </View>
    </TouchableOpacity>
  </View>
)

export {
	MenuButton,
	FootButton,
	RenderRow
}