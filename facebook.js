import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {
  Alert,
  AppRegistry,
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

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import Empty from './Empty'
import Login from './Login'
import Menu from './Menu'

export default class Facebook extends Component {

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
    Keychain.getInternetCredentials('facebook')
    .then(sec => {
      this.setState({state: 'logged'})
    })
    .catch(err => {
      this.setState({state: 'login'})
    });
  }

  user() {}

  friends() {
    this.props.nav.push({
      name: 'FriendsFacebook',
      title: 'Facebook',
    });
  }

  login() {
    this.setState({state: 'empty'});
    LoginManager.logInWithReadPermissions(['user_friends', 'user_photos'])
    .then(res => {
        if (res.isCancelled) {
          this.setState({state: 'login'})
        } else {
          AccessToken.getCurrentAccessToken()
          .then(res => {
            console.log('Facebook sign in ', res);
            Keychain.setInternetCredentials('facebook', 'username', res.accessToken)
            .then(res => this.setState({state: 'logged'}))
            .catch(err => console.log('Keychain error', err));
          })
        }
      },
      err => console.log('Login failed with error: ', err)
    );
  }

  logout() {
    Alert.alert(
      'Facebook log out',
      'Do you want to log out from your Facebook account?',
      [
        {text: 'Yes', onPress: () => {
            this.setState({state: 'login'})
            LoginManager.logOut();
            Keychain.resetInternetCredentials('facebook')
            .catch(err => console.log('Keychain error ', err));
          }
        },
        {text: 'No'}
      ]
    )
  }

  render() {
    switch(this.state.state) {
      case 'empty':
        return (<Empty />)
      case 'login':
        return (
          <Login
            icon="facebook-square"
            type="Facebook"
            login={this.login} />)
      case 'logged':
        return (
          <Menu
            user={this.user}
            logout={this.logout}
            friends={this.friends} />)
    }
  }
}
Facebook.contextTypes = {
  store: React.PropTypes.object
}
