'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

// import ImageResizer from 'react-native-image-resizer';
// import TabNavigator from 'react-native-tab-navigator';
// import ImagePicker from 'react-native-image-picker';
// import Toast from '@remobile/react-native-toast';
// import Camera from 'react-native-camera';

// import {SIZ, COL, API, OUT} from './Global';
// import {STR} from './Strings';
// import Blur from './Blur';

export default class Photo extends Component {
  render() {
    return null
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     waiting: false,
  //     captured: false,
  //   }
  //   this.navigate = this.navigate.bind(this);
  //   this.sendPhoto = this.sendPhoto.bind(this);
  //   this.fromCamera = this.fromCamera.bind(this);
  //   this.fromGallery = this.fromGallery.bind(this);
  //   this.cancelButton = this.cancelButton.bind(this);
  //   this.waitForResult = this.waitForResult.bind(this);
  // }

  // navigate(data) {
  //   this.props.nav.push({
  //     name: 'Prime',
  //     passProps: {
  //       data: data,
  //       change: this.props.change,
  //       userImage: this.userImage,
  //     }
  //   })
  // }

  // waitForResult(jobId) {
  //   fetch(API.JOB + "?jobId=" + jobId, {headers: API.HEADER})
  //   .then(res => {
  //     console.log(res);
  //     console.log(res.status);
  //     if (res.status === 202) {
  //       setTimeout(this.waitForResult.bind(this, jobId), API.DELAY)
  //     } else {
  //       res.json().then(res => {
  //         this.setState({waiting: false});
  //         this.navigate(res);
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     console.log('Prediction error ', err)
  //     this.setState({waiting: false});
  //     Toast.showShortBottom(STR.network_error);
  //   });
  // }

  // sendPhoto(uri, rotation = 0) {
  //   this.setState({waiting: true});
  //   ImageResizer.createResizedImage(uri, SIZ.newWidth, SIZ.newHeight, 'JPEG', 100, rotation)
  //   .then(uri => {

  //     var form = new FormData();
  //     form.append('image', {uri: uri, type: 'image/jpg', name: 'image.jpg'});
  //     form.append('Content-Type', 'multipart/formdata');

  //     OUT(API.TIME, fetch(API.UPL, {
  //       method: 'POST',
  //       headers: API.HEADER,
  //       body: form,
  //     }))
  //     .then(res => res.json())
  //     .then(res => {
  //       setTimeout(this.waitForResult.bind(this, res.jobId), API.DELAY)
  //     })
  //     .catch(err => {
  //       console.log('Fetch error ', err)
  //       this.setState({waiting: false});
  //       Toast.showShortBottom(STR.network_error);
  //     });
  //   })
  //   .catch(err => console.log('ImageResizer error ', err));
  // }
  
  // cancelButton() {
  //   if (this.state.waiting) return null;
  //   this.props.change('home')
  // }

  // fromGallery() {
  //   if (this.state.waiting) return null;
  //   let options = {mediaType: 'photo'}
  //   ImagePicker.launchImageLibrary(options, (res)  => {
  //     if (res.uri) {
  //       this.userImage = res.uri
  //       this.sendPhoto(res.uri);
  //     }
  //   });
  // }

  // fromCamera() {
  //   if (this.state.waiting) return null;
  //   this.refs.camera.capture()
  //   .then((data) => {
  //     this.userImage = data.path;
  //     this.sendPhoto(data.path);
  //   })
  //   .catch(err => console.error("Error camer fromCamera() " + err));
  // }

  // render() {
  //   return (
  //     <View style={{flex: 1, position: 'relative'}}>
  //       {this.state.image ? 
  //       <Image style={{flex: 1}} source={{uri: this.state.image}} />
  //       : null}
  //       <Camera
  //         caputreAudio={false}
  //         aspect={Camera.constants.Aspect.fill}
  //         captureTarget={Camera.constants.CaptureTarget.disk}
  //         ref="camera"
  //         style={{flex: 1}}>
  //         <View style={s.opaque}></View>
  //         <TabNavigator
  //           tabBarShadowStyle={{height: 0}}
  //           tabBarStyle={s.tabbar}>
  //           <TabNavigator.Item
  //             renderIcon={() => <Image source={require('./assets/circle_x_white.png')} />}
  //             renderSelectedIcon={() => <Image source={require('./assets/circle_x_white.png')} />}
  //             selected={false}
  //             tabStyle={s.tabSide}
  //             onPress={this.cancelButton}>
  //           </TabNavigator.Item>
  //           <TabNavigator.Item
  //             renderIcon={() => <Image source={require('./assets/tabbar/bar_icon_foto.png')} />}
  //             renderSelectedIcon={() => <Image source={require('./assets/tabbar/bar_icon_foto.png')} />}
  //             selected={true}
  //             tabStyle={s.tabMain}
  //             onPress={this.fromCamera}>
  //             <Blur show={this.state.waiting} type="dark" />
  //           </TabNavigator.Item>
  //           <TabNavigator.Item
  //             renderIcon={() => <Image source={require('./assets/icon_scan_gallery.png')} />}
  //             renderSelectedIcon={() => <Image source={require('./assets/icon_scan_gallery.png')} />}
  //             selected={false}
  //             tabStyle={s.tabSide}
  //             onPress={this.fromGallery}>
  //           </TabNavigator.Item>
  //         </TabNavigator>
  //         <View style={s.border}></View>
  //       </Camera>
  //     </View>
  //   );
  // }
}


// const s = StyleSheet.create({
//   opaque: {
//     opacity: 0.2,
//     borderWidth: SIZ.width/2,
//     // borderRadius: SIZ.width/1.5,
//     borderRadius: SIZ.width,
//     borderColor: '#AE9571',

//     position: 'absolute',
//     top: -SIZ.width/2 + SIZ.rating,
//     left: -SIZ.width/2 + SIZ.l,
//     right: -SIZ.width/2 + SIZ.l,
//     bottom: -SIZ.width/2 + 100,
//     backgroundColor: 'transparent',
//   },
//   border: {
//     borderWidth: 3,
//     // borderRadius: SIZ.width/6,
//     borderRadius: SIZ.width/2,
//     borderColor: COL.white,

//     position: 'absolute',
//     top: SIZ.rating,
//     left: SIZ.l,
//     right: SIZ.l,
//     bottom: 100,
//     backgroundColor: 'transparent',
//   },
//   tabbar: {
//     height: SIZ.tabbar,
//     backgroundColor: 'transparent',
//   },
//   tabMain: {
//     backgroundColor: COL.tabmain,
//     marginTop: -8,
//     borderRadius: 5,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//   },
//   tabSide: {
//     flex: 2,
//   },
// });


// https://console.aws.amazon.com/s3/home?region=us-west-2&bucket=zppiwo&prefix=media/
// zppiwo
// NYzZR!vat(OH


// I tried many different approaches, the best what I get is create one absolute element like this:

//     let {width } = Dimensions.get('window');

//     <View style={{
//       position: 'absolute',
//       top: -SIZ.width/2 + 50,
//       left: -SIZ.width/2 + 20,
//       bottom: -SIZ.width/2 + 100,
//       right: -SIZ.width/2 + 20,
//       borderWidth: SIZ.width/2,
//       borderRadius: SIZ.width,
//       borderColor: 'red',
//       opacity: 0.5,
//       backgroundColor: 'transparent',
//     }}>
//     </View>
