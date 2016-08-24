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
  Alert,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
  Navigator,
  ListView,
  AsyncStorage,
  TextInput,
  Modal,
  Image
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/FontAwesome';


import gg from './android/app/google-services.json';

import {encode} from 'base-64'
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'react-native-fetch-blob';

import {COL} from './global';

export default class Emails extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      emails: [],
      empty: false,
      modal: false
    }

    // bind methods
    this.renderRow = this.renderRow.bind(this);
    this.clickAdd = this.clickAdd.bind(this);
    this.addEmail = this.addEmail.bind(this);
  }

  componentDidMount() {
    var that = this;
    // AsyncStorage.removeItem('emails').then(_ => {


    AsyncStorage.getItem('emails')
    .then(res => {
      var emails = [];
      if (res === null || JSON.parse(res) === []) {
        that.setState({
          empty: true,
        });
        AsyncStorage.setItem('emails', JSON.stringify([]));
      } else {
        emails = JSON.parse(res);
        console.log('Before setState ', emails);

        that.setState({
          empty: false,
          emails: emails,
          dataSource: that.state.dataSource.cloneWithRows(emails)
        });
      }
      console.log('componentDidMount setState ', that.state.emails)
    })
    .catch(err => console.log('componentDid AsyncStorage error ', err));

    // });

  }

  removeEmail(id) {
    var that = this;
    AsyncStorage.getItem('emails')
    .then(res => {
      var emails = JSON.parse(res);
      emails.splice(id, 1);
      console.log('AsyncStorage ', JSON.stringify(emails));
      AsyncStorage.setItem('emails', JSON.stringify(emails));

      that.setState({
        emails: emails,
        dataSource: that.state.dataSource.cloneWithRows(emails)
      });
    })
    .catch(err => console.log('AsyncStorage error', err));
  }

  clickRemove(id, email) {
    var that = this;
    Alert.alert(
      'Remove email: ' + email,
      'Are you shure you whant to remove ' + email + ' from your receiver list?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Remove', onPress: that.removeEmail.bind(that, id)}
      ]
    )
  }


// TODO: add email validation (onChange event)
  addEmail() {
    var that = this;
    AsyncStorage.getItem('emails')
    .then(res => {
      var emails = JSON.parse(res);
      emails.push({id: that.state.email});
      that.setState({
        modal: false,
        empty: false,
        emails: emails,
        dataSource: that.state.dataSource.cloneWithRows(emails)
      });
      console.log('SetItem: ', emails)
      AsyncStorage.setItem('emails', JSON.stringify(emails));
    })
    .catch(err => console.log('AsyncStorage error ', err));
  }

  clickAdd() {
    this.setState({modal: true})
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    console.log('Render row: ' + rowData);
    return (
      <View style={styles.row}>
        <Text style={styles.email}>
          {rowData.id}
        </Text>
        <TouchableHighlight onPress={this.clickRemove.bind(this, rowId, rowData.id)} style={styles.removeButton}>
          <Text style={styles.removeText}>
            REMOVE
          </Text>
        </TouchableHighlight>
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.container}>
            <Text style={styles.addText}>Enter e-maill address</Text>
            <TextInput style={styles.input} onChangeText={(email) => this.setState({email})} />
            <TouchableHighlight onPress={this.addEmail}>
              <Text style={styles.addText}>
                ADD
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        {
          this.state.empty ?
          <Text style={styles.welcome}>Your email list is empty</Text>
          :
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
        }
        <TouchableHighlight onPress={this.clickAdd} style={styles.addButton}>
          <Text style={styles.addText}>
            Add new email address
          </Text>
        </TouchableHighlight>      
      </View>
    );
  }
}



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
