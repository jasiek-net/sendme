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
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  Navigator,
  Image
} from 'react-native';

import gg from './android/app/google-services.json';
import {API} from './global';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';


export default class Facebook extends Component {

  constructor(props) {
    super(props);
    console.log(props.user);
    this.img = props.user.picture.data.url;
    this.username = props.user.name;
    // Cool stuff! https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.friends = this.friends.bind(this);
    this.user = this.user.bind(this)
  }

  friends() {
    var that = this;
    Keychain.getInternetCredentials('facebook')
      .then(sec => {
        var token = sec.password
        var userId = sec.username
        var api = API.FB + 'me/friends?fields=name,id,picture&access_token=' + token;
        console.log('API ', api);
        fetch(api)
          .then(res => res.json())
          .then(res => {
            var friends = res.data.map(a => {
              return {
                name: a.name,
                foot: '',
                add: false,
                img: a.picture.url,
                id: a.id
              }
            });
            console.log('push to friends ', friends);
            that.props.navigator.push({id: 'friends', friends, type: 'facebook'});
          })
          .catch(err => console.log('Facebook: fetch friends ', err));
        })
        .catch(err => {
          console.log('Keychain: no credentials ', err);
        });
  }

  user() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.img}}
          resizeMode='contain'
          style={{width: 100, height: 100}} />
        <Text>{this.username}</Text>
        <TouchableHighlight onPress={this.friends} style={styles.button}>
          <Text>
            FRIENDS
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.user} style={styles.button}>
          <Text>
            YOUR PROFILE
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
