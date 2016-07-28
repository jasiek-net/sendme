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
      AsyncStorage.setItem(that.props.type, JSON.stringify(data));

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
          <Image style={styles.thumb} source={{uri: img}} />
          <View style={styles.container}>
            <View style={styles.name_info}>
              <Text style={styles.name}>
                {name === '' ? 'No Name' : name}
              </Text>
              <Text style={styles.name}>
                {foot}
              </Text>
            </View>
          </View>
          <TouchableHighlight onPress={this.pressRow.bind(this, id, rowId)}>
          <View style={styles.button}>
            {add ? 
              <Text style={styles.button_remove}>
                REMOVE{'\n'}USER!
              </Text>
            :
              <Text style={styles.button_add}>
                ADD USER!
              </Text>
            }
          </View>
          </TouchableHighlight>
        </View>);
  }

  render() {
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }
}


var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  name: {
    flex: 1,
    fontSize: 15,
  },
  add: {
// fontSize
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 10,
  },
  user_info: {
    flex: 1,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  button_add: {
    color: 'green',
  },
  button_remove: {
    color: 'red',
  },
});
