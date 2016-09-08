/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  BackAndroid,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import gg from './android/app/google-services.json';

import Main from './main';
import Instagram from './instagram';
import Facebook from './facebook';
import Friends from './friends';
import MailHelper from './mailhelper';
import Emails from './emails';
import Profile from './profile';

import {COL} from './global';


var _nav;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_nav.getCurrentRoutes().length === 1) {
    Alert.alert(
      'Leave App',
      'Do you want to leave the app?',
      [
        {text: 'Yes', onPress: () => { BackAndroid.exitApp(0) }},
        {text: 'No'}
      ]
    )
  }
  _nav.pop();
  return true;
})

class zoome extends Component {

  componentDidMount() {
    // MailHelper.registerTask();
  }

  renderScene(route, nav) {
    _nav = nav;
    switch(route.id) {
      case 'main':
        return <Main navigator={nav} />
      case 'instagram':
        return <Profile navigator={nav} user={route.user} type={route.id} />
      case 'facebook':
        return <Profile navigator={nav} user={route.user} type={route.id} />
      case 'friends':
        return <Friends navigator={nav} next={route.next} type={route.type} />
      case 'emails':
        return <Emails navigator={nav} />
    }
  }

  leftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    } else {
      return (
        <Icon.Button onPress={() => navigator.pop()} style={styles.navIcon} name="angle-left" iconStyle={styles.iconStyle}>
        </Icon.Button>
      );
    }
  }

  rightButton(route, navigator, index, navState) {
    return null;
  }

  title(route, navigator, index, navState) {
    var name = (index === 0) ? "Zoome App" : route.id.capitalize();
    return (
      <View style={styles.navView}>
        <Text style={styles.navItem}>{name}</Text>
      </View>
    );
  }

  render() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{id: 'main'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.leftButton,
              RightButton: this.rightButton,
              Title: this.title
            }}
            style={styles.navBar}
         />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    paddingTop: 54,
  },
  navBar: {
    // navbar is set to absolute, hard to style
    backgroundColor: COL.hd,
    borderBottomWidth: 1,
    borderBottomColor: COL.sec_brd,
  },
  navIcon: {
    backgroundColor: COL.hd,
  },
  iconStyle: {
    color: COL.txt,
    fontSize: 30,
    marginTop: 5,
  },
  navView: {
    flex: 1,
  },
  navItem: {
    color: COL.txt,
    fontSize: 20,
    marginTop: 15,
  }
});

AppRegistry.registerComponent('zoome', () => zoome);
