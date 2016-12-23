
String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.tup = function() {
  return this.toUpperCase();
} 

const FB_URL = 'https://graph.facebook.com/';
const IN_URL = 'https://api.instagram.com/v1/';
const GM_URL = '';

const GM_CLIENT = '725209563882-v025p7u4cl84iplutoo4n0q51nnsbkoi.apps.googleusercontent.com'
const GM_API_KEY = 'AIzaSyBtvxzYHQFuJ3dnlCR9VHMkJrfU8QgRkSk';

const IN_CLIENT_ID = 'a5b9ac8e834a4a11ba1738cf9b7c2269';
const IN_REDIRECT_URI = 'http://iga5b9ac8e834a4a11ba1738cf9b7c2269.sendme';
const IN_SCOPE = 'follower_list+public_content';

export const API = {
	FB: FB_URL,
	IN: IN_URL,
	GM: GM_URL,

	FB_friends: FB_URL + 'me/friends?fields=name,id,picture,email&limit=1&access_token=nometterwhat', // limit=1
	IN_friends: IN_URL + 'users/self/follows?access_token=', // count=2

  FB_user: FB_URL + 'me?fields=name,email,picture.type(large)&access_token=',
  IN_user: IN_URL + 'users/self?access_token=',

  IN_LOGIN: `https://api.instagram.com/oauth/authorize/` + 
            `?client_id=${ IN_CLIENT_ID }&redirect_uri=${ IN_REDIRECT_URI }` +
            `&response_type=token&scope=${ IN_SCOPE }`,

  IN_LOGOUT: 'https://instagram.com/accounts/logout',
  IN_FIRST: 'first',

  GM_CLIENT: GM_CLIENT,
  GM_API_KEY: GM_API_KEY,

  GM_SEND: (user) => `https://www.googleapis.com/gmail/v1/` + 
    `users/${user}/messages/send?key=${GM_API_KEY}?uploadType=multipart`
}

export const COL = {

  tabbar: '#222222',
  tabmain: '#303030',
  tabbrd: '#00bc8c',
  indicator: '#00bc8c',

// https://bootswatch.com/darkly/
	bg: '#222222',
	hd: '#303030',
	txt: '#b8b8b8',

	// sections
	sec_bg: '#303030',
	sec_txt: '#0ce3ac',
	sec_brd: '#464545',

	// buttons
	btn_txt: '#b8b8b8',
	btn_head: '#b8b8b8',
	btn_foot: '#b8b8b8',
	btn_bg: '#303030',
	red: '#FF6978',
	brd_big: '#464545',
	brd_sml: '#464545',
	// background

	orange: '#f39c12',
	green: '#00bc8c',
	blue: '#3498db',


  bg_dark: '#1F1B1E',
  navbar: '#1F1C1E',

  control: '#D9D1B7',
  bg_pale: '#B6AF97',
  btn_dark: '#2F2726',
  btn_pale: '#917138',
  txt_head: '#AC8647',
  txt_foot: '#B8B19C',
  txt_capt: '#2F2726',
  brd_main: '#2F2726',
  facebook: '#2E438D',
  google: '#D0302B',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#E6E6E6',
  placeholder: '#BDB0AF',
  comment: '#716463', // http://www.hexcolortool.com/#bcafae


// NEW aka DaftCode
	// btn_txt: '#b8b8b8',
	// btn_head: '#00d55a',
	// btn_foot: '#b8b8b8',
	// btn_bg: '#303030',
	// red: '#FF6978',
	// brd_big: '#b8b8b8',
	// brd_sml: '#b8b8b8',
	// // background
	// bg: '#303030',
	// // header
	// hd: '#b8b8b8',

// OLD

	// btn_txt: '#76FF03',
	// btn_head: '#09E85E',
	// btn_foot: '#75DDDD',
	// btn_bg: '#34403A',
	// red: '#FF6978',
	// brd_big: '#75DDDD',
	// brd_sml: '#09E85E',
	// // background
	// bg: '#34403A',
	// // header
	// hd: '#09E85E',
}

import {Dimensions} from 'react-native';
let { height, width } = Dimensions.get('window');

// iphone 6 width === 375
// graphics width === 750
export const SIZ = {
// size of photos sending to backend
  login: width*2/3,
  avatar: width*2/3,

  newWidth: 306,
  newHeight: 408,

  width: width,   // 750
  height: height,
  header: width/2, // 375
  action: width/3, // 250
  commen: width/4.5,// 166
  rating: width/7, // 107

  xxxxl:width/3.75, // 200
  xxxl: width/7.5,// 100
  xxl:  width/15, // 50
  xl:   width/19, // 40
  l:    width/25, // 30
  m:    width/30, // 25
  s:    width/37, // 20
  xs:   width/41, // 18
  xxs:  width/50, // 15
  xxxs: width/75, // 10


  name: width/15,
  type: width/25,
  comm: width/30,
  margin: width/37,  

  radius: 3,

  tabbar: width/15 < 50 ? 50 : width/15,
  navbar: width/17 < 44 ? 44 : width/17,
  statbar: 20,
  navall: 20 + (width/17 < 44 ? 44 : width/17),
  navmargin: 15,

  DEFAULT_HF_HEIGHT: 50,

  row_height: height/4,
  margin: height/40,
  border: height/120,
}