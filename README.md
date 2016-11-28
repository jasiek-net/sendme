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

- [x] iOS: find framework for background tasks [react-native-background-fetch](https://github.com/transistorsoft/react-native-background-fetch)
- [x] iOS: test background fetch (protip: Xcode > Debug > Simulate Background Fetch)
- [ ] iOS: Gmail SDK
- [ ] iOS: try to set specific hours for background tasks, [tutorial](https://possiblemobile.com/2013/09/ios-7-background-fetch/)
- [ ] iOS: trigger fetch every 15 minutes, check for hours in async storage
- [ ] both: implement new design for tabbar
- [ ] both: module with camera and gallery
- [ ] both: check why gmail is losing sended emails
- [ ] Android: find framework for background tasks/background fetch (workers, alarmmanager, timer, etc.)
- [ ] Android: test background fetch
