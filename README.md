Clone project into your home catalog, for fast start, add code below to `~/.bashrc` and run with `zoome`:

`# run android emulator
# to list your emulators run "emulator -list-avds"
alias and_emu="emulator @3_2_QVGA_ADP2_API_23"

# run react-native android
alias and_rea="react-native run-android"

# run all with npm server
alias zoome="and_emu & cd ~/zoome && and_rea & npm start"

# additional: run android logger
alias and_log="react-native log-android"`