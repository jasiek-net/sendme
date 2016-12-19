'use strict'

import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import { Button } from 'react-native-vector-icons/FontAwesome';

import { COL, SIZ } from './Global'
import { connect } from 'react-redux'

import Empty from './Empty'

const setting = {
  emails: 'emails recipients',
  hours: 'hours of sending',
  sync: 'send photos now!',
}

const RenderSetting = (name, callback, icon, color) => (
  <View style={styles.header}>
    <Text style={styles.headTxt}>{ setting[name].tup() }</Text>
    <Button
      style={styles.icon}
      iconStyle={{
        color: color,
        marginRight: 0,
      }}
      size={name === 'sync' ? 25 : 30}
      backgroundColor='transparent'
      name={icon}
      onPress={callback}
    />
  </View>
)

class SettingsComp extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    const ds = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b,
      sectionHeaderHasChanged: (a, b) => a !== b,
    })

    this.state = {
      list: ds.cloneWithRowsAndSections({
        emails: [...props.emails],
        hours: [...props.hours],
      })
    }
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(props) {

  }

  removeItem() {}

  addItem() {}

  renderRow(row, secId, rowId, highlightRow) {
    return (
      <View style={styles.row}>
        <Text style={styles.data}>
          {row.data}
        </Text>
        <Button
          style={styles.icon}
          size={25}
          backgroundColor='transparent'
          name='trash-o'
          iconStyle={{ color: COL.red, marginRight: 0 }}
          onPress={this.removeItem.bind(this, rowId, row.id)}
        />
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionID) {
    return RenderSetting(
      sectionID,
      () => this.addItem(),
      'plus-circle',
      COL.green
    );
  }

  renderSynchronization() {
    return RenderSetting(
      'sync',
      () => this.synchronize(),
      'paper-plane',
      COL.green,
    )
  }

  render() {
    // switch(this.props.view) {
      // case 'empty':
      //   return <Empty />
      // case 'data':
        return (
          <View style={styles.cont}>
            { this.renderSynchronization() }
            <ListView
              style={styles.list}
              dataSource={this.state.list}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
            />
          </View>);
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
  cont: {
    flex: 1,
    paddingTop: SIZ.navall,
    backgroundColor: COL.bg,
  },
  list: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    padding: 10,
    backgroundColor: COL.bg,
    borderBottomColor: COL.brd_sml,
    borderBottomWidth: 1,
  },
  headTxt: {
    fontSize: 20,
    color: COL.btn_head,
    alignItems: 'center',
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
  icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    margin: 0,
    padding: 0,
  },
  data: {
    color: COL.btn_head,
    fontSize: 20,
  },
});