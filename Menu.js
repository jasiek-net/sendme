import React, { PropTypes } from 'react';

import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { COL, SIZ } from './Global'

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
  },
});

const RenderButton = (text, icon, call) => (
  <TouchableHighlight onPress={call} style={s.button}>
    <View style={s.buttonView}>
      <Icon style={s.buttonIcon} name={icon}/>
      <Text style={s.buttonText}>
        { text }
      </Text>
      <Icon style={s.buttonArrow} name="angle-right"/>
    </View>
  </TouchableHighlight>
);

const Menu = ({
	user,
  logout,
	friends,
  profile,
}) => (
  <ScrollView style={s.cont}>
    <View style={s.user}>
      <Image style={s.img} source={{uri: user.img}} />
      <View style={s.info}>
        <Text style={s.head} numberOfLines={1}>
          { user.name === '' ? 'No Name' : user.name }
        </Text>
        <Text style={s.foot}>
          { user.foot }
        </Text>
      </View>
    </View>
    { RenderButton('Profile', 'user', profile) }
    { RenderButton('Friends', 'users', friends) }
    { RenderButton('Log out', 'sign-out', logout) }
  </ScrollView>
);

Menu.propTypes = {
	// user: PropTypes.object.isRequired,
	// logout: PropTypes.func.isRequired,
	// friends: PropTypes.func.isRequired,
 //  profile: PropTypes.func.isRequired,
}

export default Menu