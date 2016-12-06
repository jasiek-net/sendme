import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  Navigator,
  Image,
  WebView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import { API, SIZ } from './Global'

import Empty from './Empty'
import Login from './Login'
import Menu from './Menu'

export default class Instagram extends Component {

  constructor(props) {
    super(props);
    this.state = {state: 'empty'}
    // this.img = props.user.data.profile_picture;
    // this.username = props.user.data.full_name;
    this.user = this.user.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.friends = this.friends.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
  }

  componentDidMount() {
    Keychain.getInternetCredentials('instagram')
    .then(sec => {
      this.setState({state: 'logged'})
    })
    .catch(err => {
      this.setState({state: 'login'})
    });
  }

  user() {}

  friends() {
    const state = this.context.store.getState();
    this.props.nav.push({
      name: 'Friends',
      title: 'Instagram',
      props: {
        friends: state.instagram.friends
      }
    });
  }

  login() {
    this.setState({ state: 'empty' })
    this.props.nav.push({
      name: 'WebView',
      title: 'Instagram Login',
      props: {
        source: { uri: API.IN_LOGIN },
        onNavigationStateChange: this.handleUrl,
        style: { marginTop: SIZ.navall }
      }
    });
  }

  logout() {
    Alert.alert(
      'Instagram log out',
      'Do you want to log out from your Instagram account?',
      [
        {text: 'Yes', onPress: () => {
            this.setState({ state: 'login' })
            Keychain.resetInternetCredentials('instagram')
            .catch(err => console.log('Keychain error ', err));
          }
        },
        {text: 'No'}
      ]
    )
  }

  handleUrl(event) {
    let url = event.url;
    console.log(url)
    if (url && url.indexOf('#') > -1) {
      this.props.nav.pop();
      var user = 'username';
      var pass = url.split('#')[1];
      Keychain.setInternetCredentials('instagram', user, pass)
      .then(res => this.setState({ state: 'logged' }))
      .catch(err => console.log('Keychain error ', err));
    }
  }

  render() {
    switch(this.state.state) {
      case 'empty':
        return (<Empty />)
      case 'login':
        return (
          <Login
            icon='instagram'
            type='Instagram'
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
Instagram.contextTypes = {
  store: React.PropTypes.object
}
