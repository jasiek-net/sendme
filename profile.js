import React, { PropTypes } from 'react';

import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { COL, SIZ } from './Global'

const s = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    backgroundColor: COL.bg,
    paddingTop: SIZ.navall,
  },
  user: {
    marginTop: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userImg: {
    height: SIZ.avatar,
    width: SIZ.avatar,
    borderRadius: SIZ.avatar/2,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  userName: {
    fontSize: 30,
    color: COL.btn_foot,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COL.btn_foot,
    borderRadius: 5,
  },
  buttonText: {
    fontSize:20,
    color: COL.btn_head,
  },
});

const Profile = ({
	user,
	toggle,	
}) => (
	<ScrollView style={s.cont}>
    <View style={s.user}>
      <Image
        source={{uri: user.img}}
        style={s.userImg} />
      <Text style={s.userName}>{ user.name }</Text>
      <TouchableHighlight onPress={toggle} style={s.button}>
        <Text style={s.buttonText}>
          FOLLOW YOUR PROFILE
        </Text>
      </TouchableHighlight>
    </View>
	</ScrollView>
)

export default Profile