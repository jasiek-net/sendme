/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {
  AppRegistry,
  StyleSheet,
  Text,
  IntentAndroid,
  TouchableHighlight,
  Linking,
  View,
} from 'react-native';

import FBSDK from 'react-native-fbsdk';
const {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK

const btoa = require('base-64').encode
const Keychain = require('react-native-keychain');



class zoome extends Component {

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + JSON.stringify(error));
    } else {
      alert('Success fetching data: ' + JSON.stringify(result));
    }
  }

  componentDidMount() {
    var that = this;
    var url = Linking.getInitialURL().then((url) => {
      if (url) {
        that.token_insta = url.split('#')[1];
        // alert(that.token_insta);
      }
    }).catch(err => console.error('An error occurred', err));
  }


  getFB(token) {

    const infoRequest = new GraphRequest(
      '/' + token + '/inbox',
      null,
      this._responseInfoCallback,
    );

   new GraphRequestManager().addRequest(infoRequest).start(); 
  }

  loginGoogle() {
    // GoogleSignin;.hasPlayServices({ autoResolve: true }).then(() => {
    //   alert('Logged In!');
    // })
    // .catch((err) => {
    //   console.log("Play services error", err.code, err.message);
    // })

    var that = this;
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/gmail.send"], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: false // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })
    .then(() => {
      // you can now call currentUserAsync()
      GoogleSignin.signIn()
      .then((user) => {
        // alert('Logged In! ' + JSON.stringify(user));
        that.token_google = user.accessToken;
        that.id_google = user.id;
        // alert('Logged In!\nToken: ' + that.token_google + '\nId: ' + that.id_google);
        // this.setState({user: user});
        console.log('token ' + that.token_google);
        console.log('id ' + that.id_google);

        var encodedMail = btoa(
              "Content-Type: text/plain; charset=\"UTF-8\"\n" +
              "MIME-Version: 1.0\n" +
              "Content-Transfer-Encoding: 7bit\n" +
              "Subject: Subject of the mail\n" +
              "From: nieprawda@gmail.com\n" +
              "To: ramkazoome@gmail.com\n\n" +

              "Elo dziala"
            ).replace(/\+/g, '-').replace(/\//g, '_');

        fetch('https://www.googleapis.com/gmail/v1/users/114214784584142088285/messages/send?key=AIzaSyBad0oLjiEm8TJwQ2PIma97jLhT3tD_aAI', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + that.token_google,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              raw:encodedMail 
            })
          }).then((res) => {
            alert('Success: ' + JSON.stringify(res.json()));            
            console.log('Success ' + JSON.stringify(res.json()));
          }).catch((err) => {
            // alert('Error send email: ' + err);
            console.log(err);
          });

      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })

    });
  }

  loginFacebook() {
    LoginManager.logInWithReadPermissions(['read_mailbox']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          alert('Login was successful with permissions: '
            + result.grantedPermissions.toString());
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  loginInstagram() {
    var url = "https://api.instagram.com/oauth/authorize/" + 
    "?client_id=a5b9ac8e834a4a11ba1738cf9b7c2269" + 
    "&redirect_uri=insta://redirect" + 
    "&response_type=token" +
    "&scope=follower_list+public_content";

    Linking.openURL(url).catch(err => console.error('Error: ', err));
  }

  printer() {
    var api_insta = 'https://api.instagram.com/v1/users/self/follows?';
    // var api_insta = 'https://api.instagram.com/v1/users/search?q=ilisza&';
    var that = this;
    // fetch(api_insta + this.token_insta)
    //   .then((res) => res.json())
    //   .then((resJ) => {
    //     var resp = resJ.data.map(function (a) {
    //       // if (a.username === 'fgtrkl') {
    //         that.fra = a.id;
    //       // }
    //       return a.username + '\n' + a.id + '\n';
    //     });
    //     alert(that.fra);

    //   //   // alert(this.token_insta);
    //   }).catch(err => alert('Error: ' + err));

      var insta = 41415126;
      var api = 'https://api.instagram.com/v1/users/41415126/media/recent/?';
      fetch(api + that.token_insta)
        .then((res) => res.json())
        .then((resJ) => {
          alert(JSON.stringify(resJ));
          // alert(this.token_insta);
        }).catch(err => alert('Error: ' + err));


    // this.getFB();
    // var that = this;
    //  AccessToken.getCurrentAccessToken().then(
    //   (data) => {
    //     that.acc = data;
    //     that.getFB(that.acc.userID);
    //     // alert('Token: ' + that.acc.userID.toString());
    //   }
    // );
  }

  sendMail() {
    Mailer.mail({
      subject: 'need help',
      recipients: ['jan.horubala@gmail.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: 'body body body',
      isHTML: true, // iOS only, exclude if false
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
        if(error) {
          AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
        }
    });
  }

  _signIn() {
    alert('dupa blada');
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={this.loginFacebook.bind(this)} style={styles.button}>
          <Text>
            FACEBOOK
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.loginInstagram.bind(this)} style={styles.button}>
          <Text>
            INSTAGRAM        
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.loginGoogle.bind(this)} style={styles.button}>
          <Text>
            Google
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.printer.bind(this)}>
          <Text>
            PRINT!
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.sendMail.bind(this)}>
          <Text>
            Send mail!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('zoome', () => zoome);
