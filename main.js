'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Linking,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';

import { COL, SIZ } from './Global'
import Navigator from './Navigator'
import Worker from './Worker'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {tab: 'Settings'}
    this.change = this.change.bind(this);
  }

  change(state) {
    if (state !== 'Photo') {
      this.setState({tab: state})
    } else {
      console.log('press Photo')
      this.props.nav.push({
        name: 'Photo',
      })
    }
  }

  renderIcon(name, color) {
    return (<Icon name={name} size={30} color={color ? color : COL.txt} />);
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.container}>
          <TabNavigator
            tabBarStyle={this.state.tab === 'photo' ? styles.hidbar : styles.tabbar}
            sceneStyle={this.state.tab === 'photo' ? styles.hidscene : null}
            tabBarShadowStyle={{height: 0}}>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'facebook-square')}
              renderSelectedIcon={this.renderIcon.bind(null, 'facebook-square', COL.green)}
              selected={this.state.tab === 'Facebook'}
              renderAsOriginal={true}
              onPress={() => this.change('Facebook')}>
              <Navigator name="Facebook" />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'instagram')}
              renderSelectedIcon={this.renderIcon.bind(null, 'instagram', COL.green)}
              selected={this.state.tab === 'Instagram'}
              onPress={() => this.change('Instagram')}>
              <Navigator name="Instagram" />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'camera')}
              selected={false}
              tabStyle={styles.tabMain}
              onPress={() => this.change('Photo')}>
              <View></View>
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'google-plus-square')}
              renderSelectedIcon={this.renderIcon.bind(null, 'google-plus-square', COL.green)}
              selected={this.state.tab === 'Gmail'}
              onPress={() => this.change('Gmail')}>
              <Navigator name="Gmail" />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'cogs')}
              renderSelectedIcon={this.renderIcon.bind(null, 'cogs', COL.green)}
              selected={this.state.tab === 'Settings'}
              onPress={() => this.change('Settings')}>
              <Navigator name="Settings" />
            </TabNavigator.Item>
          </TabNavigator>
      </View>  
    );
  }
}
Main.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hidscene: {
    paddingBottom: 0,
  },
  hidbar: {
    overflow: 'hidden',
    height: 0,
  },
  tabbar: {
    height: SIZ.tabbar,
    backgroundColor: COL.tabbar,
    borderTopWidth: 1,
    borderColor: COL.tabbrd,
  },
  tabMain: {
    backgroundColor: COL.tabmain,
    backgroundColor: COL.tabbar,
    marginTop: -8,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: COL.tabbrd,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
});


