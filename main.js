'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';
// import Keychain from 'react-native-keychain';

import {API, COL, SIZ} from './Global'
import Navigator from './Navigator'
// import Login from './Login';
import Worker from './Worker'

// import Blur from './Blur';
// import Test from './Test';

import { loadAsync } from './Storage'
import { fetchData, fetchToken } from './Requests'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {tab: 'Facebook'}
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    const dispatch = this.context.store.dispatch;
    loadAsync(dispatch)
    .then(res => {
      console.log('wqdqwdqwdqw', res)
      fetchToken(this.context.store);
    })
  }

  change(state) {
    this.setState({tab: state})
  }

  renderIcon(name, color) {
    return (<Icon name={name} size={30} color={color ? color : COL.txt} />);
    return (<Image source={icons[i]} />);
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
              renderSelectedIcon={this.renderIcon.bind(null, 'instagram')}
              selected={this.state.tab === 'instagram'}
              onPress={() => this.change('instagram')}>
              <Navigator name="instagram" />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'camera')}
              renderSelectedIcon={this.renderIcon.bind(null, 'camera')} 
              selected={this.state.tab === 'photo' || this.state.tab === 'prime'}
              tabStyle={styles.tabMain}
              onPress={() => (this.refs.nav && this.refs.nav.getRoutes().length > 1) ? this.change('prime') : this.change('photo')}>
              <Navigator ref="nav" name="photo" change={this.change} search={this.search}/>
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'google-plus-square')}
              renderSelectedIcon={this.renderIcon.bind(null, 'google-plus-square')}
              selected={this.state.tab === 'gmail'}
              onPress={() => this.change('gmail')}>
              <Navigator name="gmail" change={this.change} />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'cogs')}
              renderSelectedIcon={this.renderIcon.bind(null, 'cogs')}
              selected={this.state.tab === 'settings'}
              onPress={() => this.change('settings')}>
              <Navigator name="settings" change={this.change} />
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


