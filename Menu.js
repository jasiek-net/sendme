import React, { PropTypes } from 'react';

import {
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
    height: 70,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
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

    // const user = (<View style={s.user}>
    //           <Image
    //             source={{uri: this.img}}
    //             resizeMode='contain'
    //             style={s.userImg} />
    //           <Text style={s.userName}>{this.username}</Text>
    //         </View>)

const Menu = ({
	user,
	friends,
	logout
}) => (
	<ScrollView style={s.cont}>
    <TouchableHighlight onPress={user} style={s.button}>
      <View style={s.buttonView}>
        <Icon style={s.buttonIcon} name="user"/>
        <Text style={s.buttonText}>
          Your profile
        </Text>
        <Icon style={s.buttonArrow} name="angle-right"/>
      </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={friends} style={s.button}>
      <View style={s.buttonView}>
        <Icon style={s.buttonIcon} name="users"/>
        <Text style={s.buttonText}>
          Friends
        </Text>
        <Icon style={s.buttonArrow} name="angle-right"/>
      </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={logout} style={s.button}>
      <View style={s.buttonView}>
        <Icon style={s.buttonIcon} name="sign-out"/>
        <Text style={s.buttonText}>
          Log out
        </Text>
        <Icon style={s.buttonArrow} name="angle-right"/>
      </View>
    </TouchableHighlight>
  </ScrollView>
);

Menu.propTypes = {
	user: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	friends: PropTypes.func.isRequired,
}

export default Menu