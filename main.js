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
  Alert,
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  ScrollView,
  Navigator,
  NativeModules,
  Image
} from 'react-native';

import { setTheme, MKColor, MKButton } from 'react-native-material-kit';

setTheme({
  primaryColor: MKColor.Teal,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});


import {API, COL} from './global';

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
    this.clickEmail = this.clickEmail.bind(this);
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
      AsyncStorage.getItem('facebook')
      .then(res => {
        if (res != null) {
          var data = JSON.parse(res);
          if (data.users) {
            console.log('All users: ', data.users);
          }
        }
      });
  }

  clickEmail() {
    this.props.navigator.push({id: 'emails'});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.welcome}>
            Welcome to zoome!
          </Text>
        </View>
        <ScrollView style={styles.scroll}>
          <TouchableHighlight onPress={this.loginGoogle.bind(this)} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                GMAIL
              </Text>
              <Text style={styles.menuFoot}>
                Configure your gmail account
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.clickEmail} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                EMAILS
              </Text>
              <Text style={styles.menuFoot}>
                Add or remove emails from your recipients list
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.clickFacebook.bind(this)} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                FACEBOOK
              </Text>
              <Text style={styles.menuFoot}>
                Configure your Facebook followers list
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.clickInstagram} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                INSTAGRAM
              </Text>
              <Text style={styles.menuFoot}>
                Configure your Instagram followers list
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.configuration} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                SETTINGS
              </Text>
              <Text style={styles.menuFoot}>
                Set the hours of sending images and other
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={MailHelper.sendPhotos} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                SEND PHOTOS
              </Text>
              <Text style={styles.menuFoot}>
                Send photos immediatly to test the app
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.printer.bind(this)} style={styles.menuItem}>
            <View>
              <Text style={styles.menuHead}>
                PRINT
              </Text>
              <Text style={styles.menuFoot}>
                Print data for debug reason
              </Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
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
          Alert.alert(
            'Google log out',
            'Do you want to log out from google account?',
            [
              {text: 'Yes', onPress: () => {GoogleSignin.signOut()}},
              {text: 'No'}
            ]
          );
        });
      })
      .catch(err => console.log('Main: gmail sign in error ', err));
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
      if (sec === null) {
        that.loginInstagram();
      } else {
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
      }
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
    backgroundColor: COL.bg,
  },
  head: {
    borderBottomColor: COL.btn_head,
    borderBottomWidth: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: COL.btn_head,
  },
  scroll: {
    flex: 1,
  },
  menuItem: {
    padding: 10,
    backgroundColor: COL.btn_bg,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
  },
  menuHead: {
    color: COL.btn_head,
    fontSize:20,
  },
  menuFoot: {
    color: COL.btn_foot,
  },
});
