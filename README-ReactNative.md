# React-native-paypal

This project was bootstrapped with [React-Native-CLI](https://github.com/facebook/react-native/tree/master/react-native-cli).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://facebook.github.io/react-native/docs/getting-started.html).

## APK link
You can download the generated apk [here](https://github.com/smohamedjavid/react-native-paypal/releases)


## [Repository Link](https://github.com/smohamedjavid/react-native-paypal)

## Installation

You should only need to update the global installation of `react-native-cli` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native` and `react` package versions.

### Dependencies

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

```
npm install
```

### Running the app

Runs your app in development mode.

#### Running on iOS

It also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

```
react-native run-ios
```

#### Running on Android

It attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). Once you've finished setting up the native build environment, the Javascript bundling will start. I recommend using the emulator which is created in Android Studio.  

```
react-native run-android
```

## Installation of react-native-paypal-wrapper

Uses PayPal SDK 2.15.6

```
$ npm install react-native-paypal-wrapper
```

### Linking dependencies in your project

```
$ react-native link react-native-paypal-wrapper
```

Extra steps for iOS [see here](https://github.com/paypal/PayPal-ios-SDK#with-or-without-cocoapods)

## Usage

### Payment
```javascript
import PayPal from 'react-native-paypal-wrapper';

// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initialize(PayPal.NO_NETWORK, "<your-client-id>");
PayPal.pay({
  price: '40.70',
  currency: 'MYR',
  description: 'Your description goes here',
}).then(confirm => console.log(confirm))
  .catch(error => console.log(error));
```

### FuturePayment

```javascript
import PayPal from 'react-native-paypal-wrapper';

// Required for Future Payments
const options = {
  merchantName : "Merchant name",
  merchantPrivacyPolicyUri: "https://example.com/privacy",
  merchantUserAgreementUri: "https://example.com/useragreement",
}
// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initializeWithOptions(PayPal.NO_NETWORK, "<your-client-id>", options);

PayPal.obtainConsent().then(authorization => console.log(authorization))
  .catch(error => console.log(error));

// To decrease payment declines, you must specify a metadata ID header (PayPal-Client-Metadata-Id)
// in the payment call. See docs:
// https://developer.paypal.com/docs/integration/mobile/make-future-payment/#required-best-practices-for-future-payments

const metadataID = await PayPal.getClientMetadataId();

```

### Acknowledgement

This project is inspired by [MattFoley](https://github.com/MattFoley/react-native-paypal) and [Taessina](https://github.com/taessina/react-native-paypal-wrapper) a fork of the former repo (which we had some problems trying to integrate due to React Native version).
React-native-paypal
