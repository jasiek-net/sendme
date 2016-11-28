
import BackgroundFetch from "react-native-background-fetch";

export default class Worker {
	static register() {	
		console.log('Worker.register() start');
		BackgroundFetch.configure({
		  stopOnTerminate: false
		},
		() => {
			console.log('BackgroundFetch: start sending photos');
			MailHelper.sendPhotos(() => { console.log('BackgroundFetch: end sending photos'); BackgroundFetch.finish(); });
		}
		, err => { console.log("RNBackgroundFetch failed to start ", err) });
	}
}


