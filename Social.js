import React, {
  Component,
  PropTypes
} from 'react';

import { Alert } from 'react-native'

import { SIZ } from './Global'

import Message from './Message'
import Empty from './Empty'
import Menu from './Menu'

export default class Social extends Component {

  constructor(props) {
    super(props);

    this.type = this.props.type.cap();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.profile = this.profile.bind(this);
    this.friends = this.friends.bind(this);
  }

  componentDidMount() { this.props.fetchData() }

  login() { this.props.login(this.props.nav) }

  logout() {
    Alert.alert(
      `${this.type} log out`,
      `Do you want to log out from your ${this.type} account? Your data will be cleared!`,
      [
        { text: 'Yes', onPress: () => this.props.logout(this.props.nav) },
        { text: 'No' }
      ]
    )
  }

  profile() {
    this.props.nav.push({
      name: 'Profile',
      title: this.type + ' Profile',
      props: {
        user: this.props.user
      }
    });
  }
  
  friends() {
    this.props.nav.push({
      name: 'Friends',
      title: this.type + ' Friends',
      props: {
        type: this.props.type,
        fetch: this.props.fetchFriends,
        toggle: this.props.toggleFriend,
      }
    });
  }

  render() {
    switch(this.props.view) {
      case 'empty':
        return (<Empty />)
      case 'error':
        return (
          <Message 
            icon="wifi"
            press={ this.props.fetchData }>
            { 'No Internet. Refresh!' }
          </Message>)
      case 'login':
        return (
          <Message
            press={ this.login }
            icon={ this.props.icon }>
            { 'Login with ' + this.props.type.cap() + '!' }
          </Message>)
      case 'logged':
        return (
          <Menu
            user={this.props.user}
            logout={this.logout}
            friends={this.friends}
            profile={this.profile} />)
    }
  }
}
Social.propTypes = {
  nav: PropTypes.object.isRequired,

  // view renedering / props
  view: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  // actions with dispatch
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  toggleFriend: PropTypes.func.isRequired,
}

