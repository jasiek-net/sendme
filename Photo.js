'use strict';

import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

// import ImageResizer from 'react-native-image-resizer';
import TabNavigator from 'react-native-tab-navigator';
import ImagePicker from 'react-native-image-picker';
// import Toast from '@remobile/react-native-toast';
import Camera from 'react-native-camera';

import Icon from 'react-native-vector-icons/FontAwesome';

import {SIZ, COL, API, OUT} from './Global';
// import {STR} from './Strings';
// import Blur from './Blur';

export default class Photo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      send: false,
      img: null,
    }
    // this.navigate = this.navigate.bind(this);
    // this.sendPhoto = this.sendPhoto.bind(this);
    this.fromCamera = this.fromCamera.bind(this);
    this.fromGallery = this.fromGallery.bind(this);
    // this.cancelButton = this.cancelButton.bind(this);
    // this.waitForResult = this.waitForResult.bind(this);
  }

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

  fromGallery() {
    // if (this.state.waiting) return null;
    let options = {mediaType: 'photo'}
    ImagePicker.launchImageLibrary(options, (res)  => {
      if (res.uri) {
        this.userImage = res.uri
        // this.sendPhoto(res.uri);
        this.setState({img: this.userImage});
      }
    });
  }

  fromCamera() {
    this.refs.camera.capture()
    .then((data) => {
      this.img = data.path;
      // this.sendPhoto(data.path);
      console.log('caputred photo')
      console.log(this.img);

      this.setState({img: this.img});
    })
    .catch(err => console.error("Error camer fromCamera() " + err));
  }

  renderIcon(name, color) {
    return (<Icon name={name} size={30} color={color ? color : COL.white} />);
  }

  render() {
    // return <View style={{flex: 1, backgroundColor: 'black'}} />
    return (
      <Camera
        caputreAudio={false}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
        ref="camera"
        style={{flex: 1, position: 'relative'}}>


        <TabNavigator
          tabBarStyle={s.tabbar}
          tabBarShadowStyle={{height: 0}}>
            <TabNavigator.Item
              tabStyle={s.tabSide}
              selected={false}
              renderIcon={this.renderIcon.bind(null, 'times-circle')}
              onPress={() => this.props.nav.pop()} />
            <TabNavigator.Item
              tabStyle={s.tabMain}
              selected={this.state.img !== null}
              renderIcon={this.renderIcon.bind(null, 'camera')}
              renderSelectedIcon={this.renderIcon.bind(null, 'camera')}
              onPress={this.fromCamera}>
              <Image
                style={s.img}
                source={{uri: this.state.img}} />
            </TabNavigator.Item>
            <TabNavigator.Item
              tabStyle={s.tabSide}
              selected={false}
              renderIcon={this.renderIcon.bind(null, 'folder-open')}
              onPress={this.fromGallery} />
          </TabNavigator>



          <View style={{
            height: 140,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'green',
            position: 'absolute',
            left: 30,
            right: 30,
            bottom: 44,
          }}>
            <TouchableOpacity style={s.btn} onPress={this.props.nav.pop}>
              <Icon
                name='times-circle'
                size={60}
                color={COL.white}
                backgroundColor='transparent' />
              <Text style={{
                borderWidth: 2,
                borderColor: COL.white,
                padding: 3,
                fontSize: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                color: COL.white,
                width: 60,
                margin: 5,
                borderRadius: 4,
              }}>
                CANCEL                
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btn}>
              <Icon
                name='paper-plane'
                size={60}
                color={COL.white}
                backgroundColor='transparent'/>
              <Text style={{
                borderWidth: 1,
                borderColor: COL.white,
                padding: 3,
                fontSize: 10,
                textAlign: 'center',
                color: COL.white,
                width: 60,
                margin: 5,
                borderRadius: 3,
              }}>
                SEND                
              </Text>
            </TouchableOpacity>
          </View>



        </Camera>
    );
  }
}

const PhotoButton = ({
  callLeft,
  callRight,
  iconLeft,
  iconRight,
}) => (
  <View>
    
  </View>
)


const s = StyleSheet.create({
  btn: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  tabbar: {
    height: SIZ.tabbar,
    backgroundColor: 'transparent',
  },
  tabMain: {
    marginTop: -8,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: COL.green,
    borderWidth: 1,
    borderBottomWidth: 0,
    // backgroundColor: COL.black,
  },
  tabSide: {
    flex: 2,
    borderColor: COL.green,
    borderTopWidth: 1,
  },
});



/*
          <View style={s.opaque}></View>
          <TabNavigator
            tabBarShadowStyle={{height: 0}}
            tabBarStyle={s.tabbar}>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'times-circle')}
              renderSelectedIcon={this.renderIcon.bind(null, 'times-circle')}
              selected={false}
              tabStyle={s.tabSide}
              onPress={this.cancelButton}>
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'camera')}
              renderSelectedIcon={this.renderIcon.bind(null, 'camera')} 
              selected={true}
              tabStyle={s.tabMain}
              onPress={this.fromCamera}>
              <View></View>
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={this.renderIcon.bind(null, 'folder-open')}
              renderSelectedIcon={this.renderIcon.bind(null, 'folder-open')} 
              selected={false}
              tabStyle={s.tabSide}
              onPress={this.fromGallery}>
            </TabNavigator.Item>
          </TabNavigator>
          <View style={s.border}></View>
*/

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
