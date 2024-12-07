# react-native-matrix-sdk and Expo test

https://github.com/unomed-dev/react-native-matrix-sdk

# Installation

````sh
yarn install
````

# Build iOS (works)

````sh
npx expo run:ios
````

# Build Android (works not)

````sh
npx expo run:android
````
Workaround

````
mkdir -p ./node_modules/@unomed/react-native-matrix-sdk/android/build/generated/source/codegen
cp -r ./node_modules/@unomed/react-native-matrix-sdk/android/generated/jni ./node_modules/@unomed/react-native-matrix-sdk/android/build/generated/source/codegen
````
