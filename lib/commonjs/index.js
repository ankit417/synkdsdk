"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynkdSdk = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebview = require("react-native-webview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SynkdSdk = _ref => {
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      height: height,
      width: width
    }, styles]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${URL}src=${SRC}&tag=${tag}&key=${key}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true
  }));
};

exports.SynkdSdk = SynkdSdk;
//# sourceMappingURL=index.js.map