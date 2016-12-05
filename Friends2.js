import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ListView,
  AsyncStorage,
  Image
} from 'react-native';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import {API, COL} from './Global';

import { connect } from 'react-redux'

import { fetchFacebook } from './Requests';

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.picture.large}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name.first} ${props.name.last}`}
    </Text>
  </View>
);


class Comp extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.friends)
    }
    // bind methods
    this.renderRow = this.renderRow.bind(this);
    this.onFetch = this.onFetch.bind(this);
  }

  componentDidMount() {
    // var that = this;
    // AsyncStorage.getItem(this.props.type)
    //   .then(res => {
    //     var friends = that.state.friends.slice();

    //     if (res !== null) {
    //       var data = JSON.parse(res);
    //       if (data && data.users) {
    //         friends = friends.map(f => {
    //           data.users.map(u => {
    //             if (f.id === u.id && u.add) {
    //               f.add = true;
    //             }
    //           });
    //           return f;
    //         })
    //       }
    //     }

    //     that.setState({
    //       friends: friends,
    //       dataSource: that.state.dataSource.cloneWithRows(that.state.friends)
    //     });

    //   })
    //   .catch(err => console.log('AsyncStorage error ', err));
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

      var friends = that.refs.list._getRows();
      console.log('Friends ', friends);
      friends = JSON.parse(JSON.stringify(friends));

      // var friends = this.state.friends.slice();
      friends[rowId].add = !friends[rowId].add;

      that.refs.list.update(friends);

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
    console.log('Render row ', rowData);
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
          <TouchableHighlight onPress={this.props.toggle.bind(null, id)}>
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

  parseData(type, res, users) {
    var friends;
    var next;
    switch(type) {
      case 'facebook': {
        next = res.paging.next;
        friends = res.data.map(a => {
          return {
            name: a.name,
            foot: a.id,
            add: false,
            img: a.picture.data.url,
            id: a.id
            }
          });
        break;
      }
      case 'instagram': {
        next = res.pagination.next_url;
        friends = res.data.map(a => {
          return {
            name: a.username,
            foot: a.full_name,
            add: false,
            img: a.profile_picture,
            id: a.id
          }
        });
        console.log('instagram ', res);
        break;
      }
    }
    if (users !== null) {
      var data = JSON.parse(users);
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

    return {friends, next}
  }

  onFetch(page = 1, callback, options) {
    var that = this;
    fetch(this.state.next)
    .then(res => res.json())
    .then(res => {
      AsyncStorage.getItem(that.props.type)
      .then(users => {
        var data = that.parseData(that.props.type, res, users);
        that.setState({next: data.next});
        callback(data.friends, {allLoaded: (data.next === undefined)})
      })
      .catch(err => console.log('AsyncStorage error: ', err))
    })
    .catch(err => console.log('Friends: fetch friends ', err));
  }

  fetch() {
    const { store } = this.context;
    fetchFacebook(store);
  }

  render() {
    return (
      <ListView
        ref="list"
        rowView={this.renderRow}
        onFetch={this.onFetch}
        firstLoader={true}
        pagination={true}
        refreshable={false}
        withSections={false}
        refreshableTintColor={COL.green}
        style={styles.list}
        customStyles={{
          border: {
            borderWidth: 1,
            padding: 3,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 3,
            borderColor: COL.green,
          },
          paginationView: {
            margin: 10,
            backgroundColor: COL.bg,
          },
          actionsLabel: {
            color: COL.green,
            fontSize: 15,
          },
        }}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={() => (<Text
          onPress={() => this.fetch()}
          style={{color: 'white', fontSize: 40}}>Fetch More!</Text>)}
        enableEmptySections={true}
      />
    );
  }
}
Comp.contextTypes = {
  store: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    friends: state.facebook.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: id => {
      dispatch({
        type: 'FB_TOGGLE',
        id
      })
    }
  }
}

const Friends = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp);

export default Friends;


const styles = StyleSheet.create({
  list: {
    backgroundColor: COL.bg,
  },
  load: {
    backgroundColor: 'red',
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