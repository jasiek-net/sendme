Clone project into your home catalog, for fast start, add code below to `~/.bashrc` and run with `zoome`:

```
# run android emulator
# to list your emulators run "emulator -list-avds"
alias and_emu="emulator @3_2_QVGA_ADP2_API_23"

# run react-native android
alias and_rea="react-native run-android"

# run all with npm server
alias zoome="and_emu & cd ~/zoome && and_rea & npm start"

# additional: run android logger
alias and_log="react-native log-android"
```



#### TODO

- [ ] iOS: Gmail SDK
- [ ] iOS: try to set specific hours for background tasks, [tutorial](https://possiblemobile.com/2013/09/ios-7-background-fetch/)
- [ ] iOS: trigger fetch every 15 minutes, check for hours in async storage
- [ ] both: implement new design for tabbar
- [ ] both: module with camera and gallery
- [ ] both: check why gmail is losing sended emails
- [ ] Android: find framework for background tasks/background fetch (workers, alarmmanager, timer, etc.)
- [ ] Android: test background fetch

- [ ] both: [rethinking react](https://facebook.github.io/react/docs/thinking-in-react.html) one more time 
- [ ] iOS: styling fb/insta/gmail view
- [ ] both: Add redux to project
- [x] iOS: test background fetch (protip: Xcode > Debug > Simulate Background Fetch)
- [x] iOS: find framework for background tasks [react-native-background-fetch](https://github.com/transistorsoft/react-native-background-fetch)


#### FAQ
- what with AccessToken.getCurrent - how often trigger and where?




1. REDUX
- https://egghead.io/courses/getting-started-with-redux
- https://egghead.io/courses/building-react-applications-with-idiomatic-redux
- https://github.com/tayiorbeii/egghead.io_redux_course_notes

- http://redux.js.org/docs/basics/UsageWithReact.html

- https://shift.infinite.red/a-tour-of-react-native-part-2-redux-friends-4fed022aaa1e
- http://blog.thebakery.io/todomvc-with-react-native-and-redux/
- http://makeitopen.com/tutorials/building-the-f8-app/data/
- https://css-tricks.com/learning-react-redux/
- https://github.com/alinz/example-react-native-redux
- https://www.packtpub.com/books/content/how-get-started-redux-react-native

- https://egghead.io/instructors/dan-abramov
- https://www.udemy.com/react-redux/?couponCode=Q15
- https://github.com/alinz/example-react-native-redux
- https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#.cp0srn9ot

- grubo: https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch

- async request:
https://medium.com/@jonlebensold/getting-started-with-react-native-redux-2b01408c0053#.o49ljw4of


After REDUX
- https://blog.callstack.io/typed-redux-2aa8bff926ff#.ks370c6hz


2. IMMUTABLE
- https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/


3. DATABASE
- realm?
- redux-persist?
- find some lib to add to redux



https://github.com/start-react/native-starter-kit
https://github.com/fbsamples/f8app
https://github.com/bartonhammond/snowflake


GOOD PRACTICES:
1. What is better? Presentational Component or React Component

A)
const Test = (props) => {
	return null;
}

B)
class Test extends Component() {

	render() {
		return null
	}
}

pros A:
- framework-agnostic (not have to use React)
- how about effeciency? it's better? it's faster? no render method, no forceUpdate?
- w ogóle jak działa react tak na prawdę? gdy wywołujemy gdziekolwiek setState() co się tak na prawdę dzieje? czy updateuje sie tylko component w którym wywołaliśmy setState? chyba tak
- a jak ciężkie jest wywołuwanie na całym reactcie rerenderu? co wtedy faktycznie sie stanie? dla Presentational Component - chyba nic! dla zwykłych Component - shouldComponentUpdate?


2. Provider - robomy wrapa na głównym komponencie i wszystkie dzieci mają dostęp do atrybutów wrapa - czemu nie robić zmiennej globalnej? Czemu nie zrobić import store from './store'?

3. Czy to subscribe na state w redux dotyczy dowolnej zmiany w stanie? czy tylko zmiany w stanie, który związany jest z danym komponentem?

4. 
