/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';

import gg from './android/app/google-services.json';

import Main from './main';
import Instagram from './instagram';
import Facebook from './facebook';
import Friends from './friends';
import MailHelper from './mailhelper';
import Emails from './emails';

class zoome extends Component {

  componentDidMount() {
    // MailHelper.registerTask();
  }

  renderScene(route, nav) {
    switch(route.id) {
      case 'main':
        return <Main navigator={nav} />
      case 'instagram':
        return <Instagram navigator={nav} user={route.user} />
      case 'facebook':
        return <Facebook navigator={nav} user={route.user} />
      case 'friends':
        return <Friends navigator={nav} friends={route.friends} type={route.type} />
      case 'emails':
        return <Emails navigator={nav} />
    }

  }

  render() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{id: 'main'}}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
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

AppRegistry.registerComponent('zoome', () => zoome);
