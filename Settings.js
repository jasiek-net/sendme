'use strict'

import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Keychain from 'react-native-keychain';
// import {FBLoginManager} from 'react-native-facebook-login';
// import {GoogleSignin} from 'react-native-google-signin';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Toast from '@remobile/react-native-toast';

// import {COL, SIZ, API} from './Global';
// import {STR} from './Strings';
// import {helper} from './Database';
// import Navbar from './Navbar';

export default class Settings extends Component {
  render() {
    return null
  }
  // constructor(props) {
  //   super(props);
  //   this.logout = this.logout.bind(this);
  //   this.logoutPress = this.logoutPress.bind(this);
  //   this.synchroPress = this.synchroPress.bind(this);
  // }
  
  // logout() {
  //   Keychain.resetGenericPassword()
  //   .then(() => {
  //     Keychain.resetInternetCredentials('facebook')
  //     .then(() => {
  //       FBLoginManager.logout((res) => {
  //         helper.removeAll();
  //         this.props.change('login');
  //       });
  //     })
  //     .catch(() => console.log('Keychain error '))

  //     Keychain.resetInternetCredentials('google-oauth2')
  //     .then(() => {
  //       GoogleSignin.signOut()
  //       .then(() => {
  //         helper.removeAll();
  //         this.props.change('login');
  //       })
  //     })
  //     .catch(() => console.log('Keychain error '))

  //   })
  // }

  // synchroPress() {
  //   Toast.showLongBottom(STR.pref_sync_in_progress);
  //   helper.synchro()
  //   .then(() => Toast.showShortBottom(STR.sync_finished))
  //   .catch(err => {
  //     console.log('Synchro error ', err);
  //     Toast.showLongBottom(STR.network_error)
  //   });
  // }

  // logoutPress() {
  //   Alert.alert(
  //     STR.pref_sign_out_title.tup(),
  //     STR.sing_out_warning_text,
  //     [
  //       {text: STR.cancel, onPress: null, style: 'cancel'},
  //       {text: STR.pref_sign_out_title, onPress: this.logout},
  //     ]
  //   )
  // }

  // render() {
  //   return (
  //   	<View style={s.container}>
  //       <Navbar />
  //       <Image
  //         style={s.backgroundImg}
  //         source={require('./assets/background/dark2.png')}>
  //         <View style={s.wrap}>
  //           <View style={s.rowuser}>
  //             <Icon
  //               name="user"
  //               color={COL.bg_pale}
  //               size={20}
  //               style={s.messageIcon}>
  //             </Icon>
  //             <Text style={s.user}>
  //               {API.USER.tup()}
  //             </Text>
  //           </View>
  //           <View style={s.row}>
  //             <Icon.Button
  //               name="refresh"
  //               onPress={this.synchroPress}
  //               iconStyle={s.messageIcon}
  //               backgroundColor='transparent'
  //               style={s.messageBtn}>
  //               <Text style={s.messageTxt}>
  //                 {STR.pref_sync_now_title.toUpperCase()}
  //               </Text>
  //             </Icon.Button>
  //           </View>
  //           <View style={s.row}>
  //             <Icon.Button
  //               name="sign-out"
  //               onPress={this.logoutPress}
  //               iconStyle={s.messageIcon}
  //               backgroundColor='transparent'
  //               style={s.messageBtn}>
  //               <Text style={s.messageTxt}>
  //                 {STR.pref_sign_out_title.toUpperCase()}
  //               </Text>
  //             </Icon.Button>
  //           </View>
  //         </View>
  //   	 </Image>
  //     </View>
  //   );
  // }
}

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: COL.bg_dark,
//   },
//   backgroundImg: {
//     flex: 1,
//     flexDirection: 'column',
//     width: null,
//     height: null,
//     resizeMode: 'stretch',
//     backgroundColor: COL.bg_dark,
//     justifyContent: 'flex-start',
//   },
//   wrap: {
//     paddingLeft: SIZ.xl,
//     paddingRight: SIZ.xl,
//   },
//   rowuser: {
//     height: SIZ.rating,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   user: {
//     padding: SIZ.s,
//     color: COL.bg_pale,
//     fontSize: SIZ.xl,
//     fontFamily: 'RobotoCondensed-Bold',
//     backgroundColor: 'transparent',
//   },
//   row: {
//     height: SIZ.rating,
//   },
//   message: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   messageTxt: {
//     color: COL.bg_pale,
//     fontSize: SIZ.xl,
//     textAlign: 'center',
//     fontFamily: 'RobotoCondensed-Bold',
//     backgroundColor: 'transparent',
//   },
//   messageView: {
//     padding: SIZ.xs,
//     paddingTop: SIZ.xxs,
//     paddingBottom: SIZ.xxs,
//   },
//   messageBtn: {
//     borderColor: COL.bg_pale,
//     borderWidth: 2,
//     padding: SIZ.xs,
//     paddingTop: SIZ.xxs,
//     paddingBottom: SIZ.xxs,
//   },
//   messageIcon: {
//     color: COL.bg_pale,
//     backgroundColor: 'transparent',
//   },
//   messageBtnTxt: {
//     color: COL.bg_pale,
//   },
// });