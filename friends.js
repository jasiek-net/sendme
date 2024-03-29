import React, { Component } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ListView,
  Image
} from 'react-native';

import { connect } from 'react-redux'
import { COL, SIZ } from './Global';

const Row = ({ toggle, row }) => (
  <View style={styles.row}>
    <Image style={styles.img} source={{uri: row.img}} />
    <View style={styles.info}>
      <Text style={styles.head} numberOfLines={1}>
        {row.name === '' ? 'No Name' : row.name}
      </Text>
      <Text style={styles.foot}>
        {row.foot}
      </Text>
    </View>
    <TouchableHighlight onPress={toggle.bind(null, row.id)}>
    {row.add ?
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
  </View>
)

class FriendsPresentational extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(props.friends),
      load: false,
    }
    this.onPress = this.onPress.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friends !== this.props.friends) {
      console.log(nextProps)
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.friends),
        load: false,
      })
    }
  }

  renderRow(row) {
    return Row({toggle: this.props.toggle, row})
  }

  onPress() {
    this.props.fetch(this.props.next);
    this.setState({ load: true });
  }

  renderFooter() {
    if (typeof this.props.next === 'undefined') {
      return null
    }
    return (
      <View style={[styles.row, {justifyContent: 'center', borderBottomWidth: 0}]}>
        {this.state.load ? 
          (<ActivityIndicator color={COL.green} />)
        :
          (<TouchableHighlight
            style={[styles.btn, {borderColor: COL.green}]}
            onPress={this.onPress}>
            <Text style={{color: COL.green}}>
              LOAD MORE
            </Text>
          </TouchableHighlight>)
        }
      </View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        enableEmptySections={true}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    friends: state[props.type].friends,
    next: state[props.type].next,
  }
}

// ACTION?
const toggle = (type, id) => ({ type, id })

const mapDispatchToProps = (dispatch, props) => {
  return {
    // toggle: id => {
    //   dispatch(toggle(props.toggle, id))
    // },
    // fetch: state => {
    //   props.fetch(state, dispatch)
    // }
  }
}

const Friends = connect(
  mapStateToProps,
)(FriendsPresentational);

export default Friends;

const styles = StyleSheet.create({
  list: {
    backgroundColor: COL.bg,
    paddingTop: SIZ.navall,
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