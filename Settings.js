'use strict'

import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Text,
  View
} from 'react-native';

import { COL, SIZ } from './Global'
import { connect } from 'react-redux'

import Empty from './Empty'

class SettingsComp extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      list: ds.cloneWithRows([
        ...props.emails,
        ...props.hours,
      ])
    }
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(props) {

  }

  clickRemove() {}

  renderRow(row, secId, rowId, highlightRow) {
    console.log('Render row: ' + row);
    return (
      <View style={styles.row}>
        <Text style={styles.email}>
          {row.email}
        </Text>
        <TouchableHighlight
          onPress={this.clickRemove.bind(this, rowId, row.id)}
          style={styles.removeButton}>
          <Text style={styles.removeText}>
            REMOVE
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    // switch(this.props.view) {
      // case 'empty':
      //   return <Empty />
      // case 'data':
        return (
          <ListView
            dataSource={this.state.list}
            renderRow={this.renderRow}
          />);
    // }
  }
}

const states = (state, props) => ({
  view: state.settings.view,
  emails: state.settings.emails,
  hours: state.settings.hours,
})

const Settings = connect( states )( SettingsComp )

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COL.bg,
  },
  addButton: {
    padding: 10,
    backgroundColor: COL.btn_bg,
    borderTopColor: COL.brd_big,
    borderTopWidth: 5,
  },
  addText: {
    color: COL.btn_head,
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    fontSize: 20,
    color: COL.btn_foot,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10,
    backgroundColor: COL.btn_bg,
    borderBottomColor: COL.brd_sml,
    borderBottomWidth: 1,
  },
  email: {
    color: COL.btn_head,
    fontSize: 20,
  },
  removeText: {
    color: COL.red,
  },
});