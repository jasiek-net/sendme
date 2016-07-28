/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  NativeModules,
  Image
} from 'react-native';

import {API} from './global';

import gg from './android/app/google-services.json';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import MailHelper from './mailhelper';

const insta_redirect = 'insta://redirect';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showImg: false
    };
    this.clickInstagram = this.clickInstagram.bind(this);
  }

  componentDidMount() {
    // check if app was redirected from instagram auth
    this.captureInsta();
  }

  loginFacebook() {
    LoginManager.logInWithReadPermissions(['user_friends', 'user_photos'])
    .then(res => {
        if (res.isCancelled) {
          alert('Facebook sign in was cancelled!');
        } else {
          AccessToken.getCurrentAccessToken()
          .then(res => {
            console.log('Facebook sign in ', res);
            Keychain.setInternetCredentials('facebook', 'username', res.accessToken);
          })
        }
      },
      err => console.log('Login failed with error: ', err)
    );
  }

  clickFacebook() {
    var that = this;
    AccessToken.refreshCurrentAccessTokenAsync()
    .then(res => {
      console.log('Facebook sign in: ', res);
      Keychain.setInternetCredentials('facebook', res.userID, res.accessToken)
      .then(() => {
        var api = API.FB + 'me?fields=id,name,picture&access_token=' + res.accessToken;
        fetch(api)
        .then(res => res.json())
        .then(res => {
          console.log('Facebook fetched: ', res);
          that.props.navigator.push({id: 'facebook', user: res});
        })
        .catch(err => console.log('Main: facebook api error ', err));
      })
      .catch(err => console.log('Main: Keychain error ', err))
    })
    .catch(err => {
      that.loginFacebook();
    });
  }

  printer() {
  // console.log('Start timeout');
  //   NativeModules.TimerModule.startTimer(5000, () => {
  //     console.log('Timeout!!!')
  //   });
  // console.log('End timeout');
//    alert(JSON.stringify(gg.client[0].api_key[0].current_key));

    // this.getFB();
    // var that = this;
    //  AccessToken.getCurrentAccessToken().then(
    //   (data) => {
    //     that.acc = data;
    //     that.getFB(that.acc.userID);
    //     // alert('Token: ' + that.acc.userID.toString());
    //   }
    // );
  }

  clickEmail() {
    this.props.navigator.push({id: 'emails'});
  }

  render() {
    var img
    var imgUrl = 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13768364_2107425766149299_897456652_n.jpg';
    if (this.state.showImg) {
      img = <Image
        source={{uri: imgUrl}}
        resizeMode='contain'
        style={{width: 100, height: 100}} />
    }
    return (
      <View style={styles.container}>
        {img}
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={this.clickEmail.bind(this)} style={styles.button}>
          <Text>
            EMAILS
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.clickFacebook.bind(this)} style={styles.button}>
          <Text>
            FACEBOOK
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.clickInstagram} style={styles.button}>
          <Text>
            INSTAGRAM        
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.loginGoogle.bind(this)} style={styles.button}>
          <Text>
            GMAL
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.printer.bind(this)}>
          <Text>
            PRINT!
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={MailHelper.sendPhotos}>
          <Text>
            Send photo!
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showCredential.bind(this)}>
          <Text>
            Show Credentials
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  loginGoogle() {
  // TODO: check google play
    // GoogleSignin;.hasPlayServices({ autoResolve: true }).then(() => {
    //   alert('Logged In!');
    // })
    // .catch((err) => {
    //   console.log("Play services error", err.code, err.message);
    // })

    var that = this;
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/gmail.send"], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: false // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })
    .then(() => {
      // you can now call currentUserAsync()
      GoogleSignin.signIn()
      .then((user) => {
        var pass = user.accessToken;
        var user = user.id;
        Keychain.setInternetCredentials('google', user, pass).then(() => {
          alert('Google: sign in success!');
        });
      })
      .catch(err => console.log('Maine: gmail sign in error ', err));
    });
  }

  showCredential() {
    var service = 'google';
//    var service = 'instagram';
    Keychain.getInternetCredentials(service)
    .then(function(credentials) {
      alert('Credentials retrieved! ' + credentials.username + ' ' + credentials.password);
    })
    .catch(function(error) {
      alert('Keychain couldn\'t be accessed! Maybe no value set? ' + error);
    });
  }

  captureInsta() {
    var url = Linking.getInitialURL()
    .then(url => {
      if (url && url.indexOf(insta_redirect) > -1) {
        var user = 'username';
        var pass = url.split('#')[1];
        Keychain.setInternetCredentials('instagram', user, pass)
          .catch(err => console.log('Main: Keychain error ' + err));    
      }
    })
    .catch(err => console.log('Main: instagram sign in error! ', err));    
  }

  loginInstagram() {
    var url = "https://api.instagram.com/oauth/authorize/" + 
    "?client_id=a5b9ac8e834a4a11ba1738cf9b7c2269" + 
    "&redirect_uri=" + insta_redirect +
    "&response_type=token" +
    "&scope=follower_list+public_content";
    Linking.openURL(url).catch(err => console.error('Linking: openURL ', err));
  }

  clickInstagram() {
    var that = this;
    Keychain.getInternetCredentials('instagram')
      .then((sec) => {
        fetch('https://api.instagram.com/v1/users/self/?' + sec.password)
          .then((res) => res.json())
          .then(res => {
            that.props.navigator.push({id: 'instagram', user: res});
          })
          .catch(err => {
            // TODO: check if error_type=OAuthAccessTokenError (no documentation)
            console.log('Instagram: access token expired ', err);
            that.loginInstagram();
          })
      })
      .catch((err) => {
        console.log('Instagram: no credentials ', err);
        that.loginInstagram();
      });
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
