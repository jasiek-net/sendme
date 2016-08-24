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
          dataSource: that.state.dataSource.cloneWithRows(that.state.emails)
        });
      }
      console.log('componentDidMount setState ', that.state.emails)
    })
    .catch(err => console.log('componentDid AsyncStorage error ', err));

    // });

  }

  removeMail(id) {
    var that = this;
    AsyncStorage.getItem('emails')
    .then(res => {
      var emails = JSON.parse(res);
      emails.splice(id, 1);
      console.log('AsyncStorage ', JSON.stringify(emails));
      AsyncStorage.setItem('emails', JSON.stringify(emails));

      this.setState({emails});
    })
    .catch(err => console.log('AsyncStorage error', err));
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    console.log('Render row: ' + rowData);
    return (
      <View style={styles.row}>
        <View style={styles.name_info}>
          <Text style={styles.name}>
            {rowData.id}
          </Text>
        </View>
        <TouchableHighlight onPress={this.removeMail.bind(this, rowId)}>
          <Text style={styles.button_remove}>
            REMOVE{'\n'}USER!
          </Text>
        </TouchableHighlight>
      </View>);
  }

// TODO: add email validation (onChange event)
  addEmail() {
    var that = this;
    AsyncStorage.setItem('emails', null);
    AsyncStorage.getItem('emails')
    .then(res => {
      var emails = JSON.parse(res);
      emails.push({id: that.state.email});
      that.setState({
        modal: false,
        empty: false,
        emails: emails
      });
      console.log('SetItem: ', emails)
      AsyncStorage.setItem('emails', JSON.stringify(emails));
    })
    .catch(err => console.log('AsyncStorage error ', err));
  }

  clickAdd() {
    this.setState({modal: true})
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
          <View>
            <Text style={styles.instructions}>Enter e-maill address that will recieve photos</Text>
            <TextInput onChangeText={(email) => this.setState({email})} />
            <TouchableHighlight onPress={this.addEmail} style={styles.button}>
              <Text>
                Add new email address
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <TouchableHighlight onPress={this.clickAdd} style={styles.button}>
          <Text>
            Add new email address
          </Text>
        </TouchableHighlight>      
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
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    marginBottom: 10,
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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
  user_info: {
    flex: 1,
    paddingTop: 10,
  },
  button_add: {
    color: 'green',
  },
  button_remove: {
    color: 'red',
  },

});
