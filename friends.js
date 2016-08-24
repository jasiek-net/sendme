import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {
  AppRegistry,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  Navigator,
  ListView,
  AsyncStorage,
  Image
} from 'react-native';

import gg from './android/app/google-services.json';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import {API, COL} from './global';

export default class Friends extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      friends: props.friends
    }

    // bind methods
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    var that = this;
    AsyncStorage.getItem(this.props.type)
      .then(res => {
        var friends = that.state.friends.slice();

        if (res !== null) {
          var data = JSON.parse(res);
          if (data && data.users) {
            friends = friends.map(f => {
              data.users.map(u => {
                if (f.id === u.id && u.add) {
                  f.add = true;
                }
              });
              return f;
            })
          }
        }

        that.setState({
          friends: friends,
          dataSource: that.state.dataSource.cloneWithRows(that.state.friends)
        });

      })
      .catch(err => console.log('AsyncStorage error ', err));
  }

  pressRow(id, rowId) {
    var that = this;
    AsyncStorage.getItem(this.props.type)
    .then(res => {
      var data;
      if (res === null) {
        data = {users: [{id: id, add: true, last: 0}]};
      } else {
        data = JSON.parse(res);
        var not_exists = true;
        data.users.map(u => {
          if (u.id === id) {
            u.add = !u.add;
            not_exists = false;
          }
        });
        if (not_exists) {
          data.users.push({id: id, add: true, last: 0});
        }
      }
      console.log('AsyncStorage ', JSON.stringify(data));
      AsyncStorage.setItem(that.props.type, JSON.stringify(data))
      .catch(err => console.log('AsyncStorage error ', err));

      var friends = this.state.friends.slice();
      friends[rowId].add = !friends[rowId].add;
      this.setState({
        friends: friends
      });

    })
    .catch(err => console.log('AsyncStorage error', err));
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    var name = rowData.name;
    var foot = rowData.foot;
    var add = rowData.add;
    var img = rowData.img;
    var id = rowData.id;
    return (
        <View style={styles.row}>
          <Image style={styles.img} source={{uri: img}} />
          <View style={styles.info}>
            <Text style={styles.head} numberOfLines={1}>
              {name === '' ? 'No Name' : name}
            </Text>
            <Text style={styles.foot}>
              {foot}
            </Text>
          </View>
          <TouchableHighlight onPress={this.pressRow.bind(this, id, rowId)}>
          {add ?
            <View style={[styles.btn, styles.unfollowBtn]}>
              <Text style={styles.unfollowTxt}>
                UNFOLLOW
              </Text>
            </View>
          :
            <View style={[styles.btn, styles.followBtn]}>
              <Text style={styles.followTxt}>
                FOLLOW
              </Text>
            </View>
          }
          </TouchableHighlight>
        </View>);
  }

  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: COL.bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COL.brd_sml,
    backgroundColor: COL.bg,
  },
  cont: {
    flexDirection: 'row',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  info: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  head: {
    fontSize: 20,
    color: COL.btn_head,
  },
  foot: {
    color: COL.btn_foot,
  },
  btn: {
    borderWidth: 1,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
  },
  followBtn: {
    borderColor: COL.btn_head,
  },
  followTxt: {
    color: COL.btn_head,
  },
  unfollowBtn: {
    backgroundColor: COL.btn_foot,
  },
  unfollowTxt: {
    color: COL.btn_bg,
  },
});