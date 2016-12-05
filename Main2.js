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

import Icon from 'react-native-vector-icons/FontAwesome';



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

  clickEmail() {
    this.props.navigator.push({id: 'emails'});
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

  printer() {
    AsyncStorage.removeItem('facebook')
    .then(res => console.log('Instagram cleared! ', res));
    AsyncStorage.removeItem('instagram')
    .then(res => console.log('Instagram cleared! ', res));

    // AsyncStorage.getItem('emails')
    // .then(res => {
    //   if (res != null) {
    //     var data = JSON.parse(res);
    //     console.log('All users: ', data);
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>

          <View style={[styles.section, {marginTop: 20}]}>
            <View style={[styles.sectionHead, {borderBottomColor: COL.green}]}>
              <Text style={[styles.sectionText, {color: COL.green}]}>
                SOCIAL ACCOUNTS
              </Text>
            </View>
            <TouchableHighlight onPress={this.clickFacebook.bind(this)} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="facebook-square"/>
                <Text style={styles.buttonText}>
                  Facebook
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.clickInstagram} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="instagram"/>
                <Text style={styles.buttonText}>
                  Instagram
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.section}>
            <View style={[styles.sectionHead, {borderBottomColor: COL.blue}]}>
              <Text style={[styles.sectionText, {color: COL.blue}]}>
                MAIN SETTINGS
              </Text>
            </View>
            <TouchableHighlight onPress={this.loginGoogle.bind(this)} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="google"/>
                <Text style={styles.buttonText}>
                  Gmail Account
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.clickEmail} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="envelope-o"/>
                <Text style={styles.buttonText}>
                  Recipients emails
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[styles.section, {marginBottom: 20}]}>
            <View style={[styles.sectionHead, {borderBottomColor: COL.orange}]}>
              <Text style={[styles.sectionText, {color: COL.orange}]}>
                CONFIGURATIONS
              </Text>
            </View>
            <TouchableHighlight onPress={this.configuration} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="cogs"/>
                <Text style={styles.buttonText}>
                  Settings
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={MailHelper.sendPhotos} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="paper-plane"/>
                <Text style={styles.buttonText}>
                  Send photos now!
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.printer.bind(this)} style={styles.button}>
              <View style={styles.buttonView}>
                <Icon style={styles.buttonIcon} name="print"/>
                <Text style={styles.buttonText}>
                  Print debug info
                </Text>
                <Icon style={styles.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COL.bg,
  },
  scroll: {
    flex: 1,
  },
  section: {
    margin: 10,
    backgroundColor: COL.sec_bg,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COL.sec_brd,
  },
  sectionHead: {
    padding: 10,
    borderBottomWidth: 1,
  },
  sectionText: {
    color: COL.sec_txt,
    fontWeight: '700',
  },
  icon: {
    width: 30,
    color: COL.btn_head,
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
    marginRight: 10,
  },
  buttonArrow: {
    color: COL.btn_txt,
    fontSize: 20,
  },
  menuFoot: {
    color: COL.btn_foot,
  },
});
