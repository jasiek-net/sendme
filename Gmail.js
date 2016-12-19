import React, {Component} from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  Navigator,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { API, COL, GM_CLIENT_ID } from './Global';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import { GoogleSignin } from 'react-native-google-signin';

import Message from './Message'
import Empty from './Empty'
import Menu from './Menu'

export default class Gmail extends Component {

  constructor(props) {
    super(props);
    this.state = {state: 'empty'}
    // this.img = props.user.picture.data.url;
    // this.username = props.user.name;

    this.user = this.user.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.friends = this.friends.bind(this);
  }

  componentDidMount() {
    Keychain.getInternetCredentials('gmail')
    .then(sec => {
      this.setState({state: 'logged'})
    })
    .catch(err => {
      this.setState({state: 'login'})
    });
  }

  user() {}

  friends() {}

  login() {
    this.setState({ state: 'empty' })
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/gmail.send"],
        offlineAccess: false,
        iosClientId: GM_CLIENT_ID,
      })
      .then(() => {
        GoogleSignin.signIn()
        .then(res => {
          var pass = res.accessToken;
          var user = res.id;
          // const user = {
          //   name: res.name,
          //   foot: res.email,
          //   img: res.photo,
          //   add: false,
          // }
          Keychain.setInternetCredentials('gmail', user, pass)
          .then(res => this.setState({state: 'logged'}))
          .catch(err => console.log('Keychain error', err));
        });
      })
      .catch(err => console.log('Main: gmail sign in error ', err));
    })
    .catch(err => console.log("Play services error", err.code, err.message))
  }

  logout() {
    Alert.alert(
      'Gmail log out',
      'Do you want to log out from Gmail account?',
      [
        {text: 'Yes', onPress: () => {
            this.setState({ state: 'login' })
            GoogleSignin.signOut()
            Keychain.resetInternetCredentials('gmail')
            .catch(err => console.log('Keychain error ', err));
          }
        },
        {text: 'No'}
      ]
    );

  }

  render() {
    switch(this.state.state) {
      case 'empty':
        return (<Empty />)
      case 'login':
        return (
          <Message
            icon="google-plus-square"
            text="Login with Gmail!"
            press={this.login} />)
      case 'logged':
        return (
          <Menu
            user={this.user}
            logout={this.logout}
            friends={this.friends} />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COL.bg,
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
