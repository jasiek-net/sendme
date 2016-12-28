'use strict';

import React, { Component } from 'react';
import {
  Image,
  Navigator,
  StyleSheet,
  TouchableHighlight,
  Text,
  WebView,
  View,
} from 'react-native';

import { Button } from 'react-native-vector-icons/FontAwesome';

import { COL, SIZ } from './Global'
import {
  Gmail,
  Facebook,
  Instagram,
} from './SocialFabric'

import Main from './Main';
import Photo from './Photo';
import Settings from './Settings'
import Friends from './Friends'
import Profile from './Profile'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  getRoutes() {
    return this.refs.nav.getCurrentRoutes();
  }

  popToTop() {
    this.refs.nav.popToTop();
  }


  push(data) {
    this.refs.nav.push(data)
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'Main':
        return <Main nav={nav} />

      case 'Facebook':
        return <Facebook nav={nav} />

      case 'Instagram':
        return <Instagram nav={nav} />

      case 'Gmail':
        return <Gmail nav={nav} />

      case 'Photo':
        return (<Photo nav={nav} {...route.props} />)

      case 'Settings':
        return (<Settings nav={nav} {...route.props} />)      

      case 'Friends':
        return (<Friends nav={nav} {...route.props} />)

      case 'Profile':
        return (<Profile nav={nav} {...route.props} />)
      // case 'FriendsInstagram':
      //   return  (<FriendsInstagram nav={nav} {...route.props} />)
      // case 'FriendsFacebook':
      //   return  (<FriendsFacebook nav={nav} {...route.props} />)

      case 'WebView':
        return (<WebView nav={nav} {...route.props} />)


      case 'Empty':
        return <View style={{flex: 1}} />
      case 'Image':
        return <Image {...route.props} />
    }
  }

  configureScene(route, routeStack) {
    switch (route.name) {
      case 'Photo':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.PushFromRight

    // return Navigator.SceneConfigs.PushFromRight (default)
    // return Navigator.SceneConfigs.FloatFromRight
    // return Navigator.SceneConfigs.FloatFromLeft
    // return Navigator.SceneConfigs.FloatFromBottomAndroid
    // return Navigator.SceneConfigs.FadeAndroid
    // return Navigator.SceneConfigs.SwipeFromLeft
    // return Navigator.SceneConfigs.HorizontalSwipeJump
    // return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    // return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft
    // return Navigator.SceneConfigs.VerticalUpSwipeJump
    // return Navigator.SceneConfigs.VerticalDownSwipeJump

    }
  }

  render() {
    if (this.props.hideNavBar) {
      return (
        <Navigator
          ref='nav'
          style={{ flex: 1, position: 'relative' }}
          initialRoute={{ name: this.props.name, title: this.props.name }}
          renderScene={ this.renderScene }
          configureScene={ this.configureScene } />
      );
    } else {
      return (
        <Navigator
          ref='nav'
          style={{ flex: 1 }}
          initialRoute={{ name: this.props.name, title: this.props.name }}
          renderScene={ this.renderScene }
          configureScene={ this.configureScene }
          navigationBar={ Navbar } />
      );
    }
  }
}

// Navigation Bar

const s = StyleSheet.create({
  nav: {
    height: SIZ.navall,
    backgroundColor: COL.bg,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,    
  },
  btn: {
    marginLeft: 5,
  },
  ico: {
    color: COL.txt,
  },
  title: {
    marginTop: 10,
    color: COL.txt,
    fontSize: 22,
  },
})

const Navbar = (
  <Navigator.NavigationBar
    style={ s.nav }
    routeMapper={{
      LeftButton: (route, navigator, index, navState) => {
        if (index === 0) {
          return null
        }
        return (
          <Button
            style={s.btn}
            size={30}
            backgroundColor='transparent'
            name='angle-left'
            iconStyle={s.btn}
            onPress={() => navigator.pop()}
          />)
      },
      Title: (route, navigator, index, navState) => {
        return (<Text style={ s.title }>{ route.title.cap() }</Text>)
      },
      RightButton: () => {
        return null
      },
    }}
  />
);

