'use strict';

import React, {Component} from 'react';
import {Navigator} from 'react-native';

import Facebook from './Facebook';
import Instagram from './Instagram';
import Photo from './Photo';
import Gmail from './Gmail';
import Settings from './Settings';

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
        return (<Facebook nav={nav} {...route.passProps} />)
      case 'Instagram':
        return (<Instagram nav={nav} {...route.passProps} />);
      case 'Photo':
        return (<Photo nav={nav} {...route.passProps} change={this.props.change} />)
      case 'Gmail':
        return  (<Gmail nav={nav} {...route.passProps} />)
      case 'Settings':
        return  (<Settings nav={nav} {...route.passProps} change={this.props.change} />)      

     }
  }

  render() {
    return (
        <Navigator
          ref='nav'
          style={{flex:1}}
          initialRoute={{ name: this.props.name }}
          renderScene={ this.renderScene } />
      );
  }
}