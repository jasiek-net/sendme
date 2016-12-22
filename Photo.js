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

import Navigator from './Navigator'

import Icon from 'react-native-vector-icons/FontAwesome';

import {SIZ, COL, API, OUT} from './Global';
// import {STR} from './Strings';
// import Blur from './Blur';

// props.nav <- main navigator to application
// refs.nav <- navigator for photo flow (with hidden )

export default class Photo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      send: false,
      img: false,
    }
    this.pushImage = this.pushImage.bind(this);
    this.pressCancel = this.pressCancel.bind(this);

    this.fromCamera = this.fromCamera.bind(this);
    this.fromGallery = this.fromGallery.bind(this);
  }

  pushImage(img) {
    this.refs.nav.push({
      name: 'Image',
      props: {
        source: {uri: img},
        style: s.img,
      }        
    })
    this.setState({img});
  }

  fromGallery() {
    // if (this.state.waiting) return null;
    let options = {mediaType: 'photo'}
    ImagePicker.launchImageLibrary(options, (res)  => {
      if (res.uri) {
        this.userImage = res.uri
        // this.sendPhoto(res.uri);
        // this.setState({img: this.userImage});
        this.pushImage(res.uri);
      }
    });
  }

  fromCamera() {
    if (this.state.img) {
      console.log('send photo', this.state.img);
    } else {    
      this.refs.camera.capture()
      .then(data => {
        this.pushImage(data.path);
      })
      .catch(err => console.error("Error camer fromCamera() " + err));
    }
  }

  renderIcon(name, color) {
    return (<Icon name={name} size={30} color={color ? color : COL.white} />);
  }

  pressCancel() {
    console.log('pressCancel');
    if (this.state.img) {
      this.refs.nav.popToTop()
      this.setState({img: false});
    } else {
      this.props.nav.pop();
    }
  }

  render() {
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
              renderIcon={
                this.state.img ?
                this.renderIcon.bind(null, 'arrow-circle-left') : 
                this.renderIcon.bind(null, 'times-circle')}
              onPress={this.pressCancel} />
            <TabNavigator.Item
              tabStyle={s.tabMain}
              selected={true}
              renderSelectedIcon={
                this.state.img ?
                this.renderIcon.bind(null, 'paper-plane') : 
                this.renderIcon.bind(null, 'camera')}
              onPress={this.fromCamera}>
              <View style={s.all}>
                <Navigator ref='nav' name='Empty' hideNavBar={true} />
              </View>
            </TabNavigator.Item>
            <TabNavigator.Item
              tabStyle={s.tabSide}
              selected={false}
              renderIcon={this.renderIcon.bind(null, 'folder-open')}
              onPress={this.fromGallery} />
          </TabNavigator>




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
  all: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
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
    borderColor: COL.white,
    borderWidth: 1,
    borderBottomWidth: 0,
    // backgroundColor: COL.black,
  },
  tabSide: {
    flex: 2,
    borderColor: COL.white,
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
