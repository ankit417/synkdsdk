import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
export const SynkdSdk = _ref => {
  let {
    key,
    tag,
    mraid = false,
    height = 400,
    width = 400,
    styles
  } = _ref;
  const URL = 'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
  const SRC = 'https://media-cdn.synkd.life/fenix.js';
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      height: height,
      width: width
    }, styles]
  }, /*#__PURE__*/React.createElement(WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${URL}src=${SRC}&tag=${tag}&key=${key}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true
  }));
};
//# sourceMappingURL=index.js.map