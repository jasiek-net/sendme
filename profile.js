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

import gg from './android/app/google-services.json';
import {API, COL} from './global';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';


export default class Profile extends Component {

  constructor(props) {
    super(props);
    console.log(props.user);
    switch(this.props.type) {
      case 'facebook': {
        this.img = props.user.picture.data.url;
        this.username = props.user.name;
        break;
      }
      case 'instagram': {
        this.img = props.user.data.profile_picture;
        this.username = props.user.data.full_name;
        break;
      }
    }
    // Cool stuff! https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.user = this.user.bind(this);
    this.friends = this.friends.bind(this);
    this.logout = this.logout.bind(this);
  }

  friends_facebook() {
    var that = this;
    Keychain.getInternetCredentials('facebook')
      .then(sec => {
        var token = sec.password
        var userId = sec.username
        var api = API.FB + 'me/friends?fields=name,id,picture&access_token=' + token
          + '&limit=1';
        console.log('API ', api);
        fetch(api)
          .then(res => res.json())
          .then(res => {
            var next = res.paging.next;
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
            that.props.navigator.push({id: 'friends', type: 'facebook', friends, next});
          })
          .catch(err => console.log('Facebook: fetch friends ', err));
        })
        .catch(err => {
          console.log('Keychain: no credentials ', err);
        });
  }

  friends_instagram() {
    var that = this;
    Keychain.getInternetCredentials('instagram')
      .then(sec => {
        var token = sec.password
        var api = API.IN + 'users/self/follows?' + token;
        fetch(api)
          .then(res => res.json())
          .then(res => {
            var friends = res.data.map(a => {
              return {
                name: a.username,
                foot: a.full_name,
                add: false,
                img: a.profile_picture,
                id: a.id
              }
            });
            that.props.navigator.push({id: 'friends', friends, type: 'instagram'});
          })
          .catch(err => console.log('Instagram: fetch friends ', err));
        })
        .catch(err => {
          console.log('Keychain: no credentials ', err);
        });
  }

  friends() {
    var api;
    var type = this.props.type;
    switch(type) {
      case 'facebook':
        api = API.FB_friends;
        break;
      case 'instagram':
        api = API.IN_friends;
        break;
    }

    var that = this;
    Keychain.getInternetCredentials(type)
    .then(sec => {
      var token = sec.password
      that.props.navigator.push({id: 'friends', type: type, next: api + token});
    })
    .catch(err => console.log('Keychain error ', err));
  }

  user() {

  }

  logout_facebook() {
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

  logout_instagram() {
    var that = this;
    Alert.alert(
      'Instagram log out',
      'Do you want to log out from your instagram account?',
      [
        {text: 'Yes', onPress: () => { 
          Keychain.resetInternetCredentials('instagram');
          var url = 'https://instagram.com/accounts/logout';
          Linking.openURL(url)
          .catch(err => console.log('Instagram: logout error ', err));
          that.props.navigator.pop();
          }
        },
        {text: 'No'}
      ]
    )
  }

  logout() {
    switch(this.props.type) {
      case 'facebook': {
        this.logout_facebook();
        break;
      }
      case 'instagram': {
        this.logout_instagram();
        break;
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            source={{uri: this.img}}
            resizeMode='contain'
            style={styles.userImg} />
          <Text style={styles.userName}>{this.username}</Text>
        </View>
        <TouchableHighlight onPress={this.user} style={styles.button}>
          <View style={styles.buttonView}>
            <Icon style={styles.buttonIcon} name="user"/>
            <Text style={styles.buttonText}>
              Your profile
            </Text>
            <Icon style={styles.buttonArrow} name="angle-right"/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.friends} style={styles.button}>
          <View style={styles.buttonView}>
            <Icon style={styles.buttonIcon} name="users"/>
            <Text style={styles.buttonText}>
              Friends
            </Text>
            <Icon style={styles.buttonArrow} name="angle-right"/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.logout} style={styles.button}>
          <View style={styles.buttonView}>
            <Icon style={styles.buttonIcon} name="sign-out"/>
            <Text style={styles.buttonText}>
              Log out
            </Text>
            <Icon style={styles.buttonArrow} name="angle-right"/>
          </View>
        </TouchableHighlight>
      </View>
    );
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
