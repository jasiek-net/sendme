'use strict';

import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  TouchableHighlight,
  Text,
  WebView,
} from 'react-native';

import { Button } from 'react-native-vector-icons/FontAwesome';

import { COL, SIZ } from './Global';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Photo from './Photo';
import Gmail from './Gmail';
import Settings from './Settings';

import Friends from './Friends';

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

  renderScene(route, nav) {
    switch (route.name) {
      case 'Facebook':
        return (<Facebook nav={nav} {...route.props} />)
      case 'Instagram':
        return (<Instagram nav={nav} {...route.props} />);
      case 'Photo':
        return (<Photo nav={nav} {...route.props} change={this.props.change} />)
      case 'Gmail':
        return  (<Gmail nav={nav} {...route.props} />)
      case 'Settings':
        return  (<Settings nav={nav} {...route.props} change={this.props.change} />)      

      case 'Friends':
        return  (<Friends nav={nav} {...route.props} />)
      // case 'FriendsInstagram':
      //   return  (<FriendsInstagram nav={nav} {...route.props} />)
      // case 'FriendsFacebook':
      //   return  (<FriendsFacebook nav={nav} {...route.props} />)

      case 'WebView':
        return (<WebView nav={nav} {...route.props} />)
     }
  }

  render() {
    return (
        <Navigator
          ref='nav'
          style={{flex:1}}
          initialRoute={{ name: this.props.name, title: this.props.name }}
          renderScene={ this.renderScene }
          navigationBar={Navbar} />
      );
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
        return (<Text style={ s.title }>{ route.title.capitalize() }</Text>)
      },
      RightButton: () => {
        return null
      },
    }}
  />
);

