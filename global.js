
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const FB_URL = 'https://graph.facebook.com/';
const IN_URL = 'https://api.instagram.com/v1/';
const GM_URL = '';

const API = {
	FB: FB_URL,
	IN: IN_URL,
	GM: GM_URL,

	FB_friends: FB_URL + 'me/friends?fields=name,id,picture&access_token=',
	IN_friends: IN_URL + 'users/self/follows?',
}

const COL = {

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

export {
	API,
	COL,
}
