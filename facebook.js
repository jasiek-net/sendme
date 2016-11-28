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

import gg from './android/app/google-services.json';
import {API, COL, SIZ} from './Global';
import Empty from './Empty';
import Login from './Login';

export default class Facebook extends Component {

  constructor(props) {
    super(props);
    this.state = {state: 'empty'}
    // this.img = props.user.picture.data.url;
    // this.username = props.user.name;
    // Cool stuff! https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.user = this.user.bind(this);
    this.friends = this.friends.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    Keychain.getInternetCredentials('facebook')
    .then(sec => {
      this.setState({state: 'logged'})
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
              foot: a.id,
              add: false,
              img: a.picture.data.url,
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
      this.setState({state: 'login'})
    });
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
                foot: a.id,
                add: false,
                img: a.picture.data.url,
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

  login() {
    this.setState({state: 'empty'});
    LoginManager.logInWithReadPermissions(['user_friends', 'user_photos'])
    .then(res => {
        if (res.isCancelled) {
          alert('Facebook sign in was cancelled!');
        } else {
          console.log(res);
          AccessToken.getCurrentAccessToken()
          .then(res => {
            console.log('Facebook sign in ', res);
            Keychain.setInternetCredentials('facebook', 'username', res.accessToken);
            this.setState({state: 'logged'});
          })
        }
      },
      err => console.log('Login failed with error: ', err)
    );
  }

  logout() {
    var that = this;
    Alert.alert(
      'Facebook log out',
      'Do you want to log out from your facebook account?',
      [
        {text: 'Yes', onPress: () => { LoginManager.logOut(); that.props.navigator.pop() }},
        {text: 'No'}
      ]
    )
  }

  render() {
    switch(this.state.state) {
      case 'empty':
        return (<Empty />)
      case 'login':
        return (<Login icon="facebook-square" type="Facebook" call={this.login} />)
      case 'logged':
        return (
          <View style={s.cont}>
            <View style={s.user}>
              <Image
                source={{uri: this.img}}
                resizeMode='contain'
                style={s.userImg} />
              <Text style={s.userName}>{this.username}</Text>
            </View>
            <TouchableHighlight onPress={this.user} style={s.button}>
              <View style={s.buttonView}>
                <Icon style={s.buttonIcon} name="user"/>
                <Text style={s.buttonText}>
                  Your profile
                </Text>
                <Icon style={s.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.friends} style={s.button}>
              <View style={s.buttonView}>
                <Icon style={s.buttonIcon} name="users"/>
                <Text style={s.buttonText}>
                  Friends
                </Text>
                <Icon style={s.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.logout} style={s.button}>
              <View style={s.buttonView}>
                <Icon style={s.buttonIcon} name="sign-out"/>
                <Text style={s.buttonText}>
                  Log out
                </Text>
                <Icon style={s.buttonArrow} name="angle-right"/>
              </View>
            </TouchableHighlight>
          </View>);
    }
  }
}

const s = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
