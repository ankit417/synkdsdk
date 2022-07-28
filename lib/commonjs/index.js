"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynkdSdkNew = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebview = require("react-native-webview");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DeviceWidth = _reactNative.Dimensions.get('window').width;

const DeviceHeight = _reactNative.Dimensions.get('window').height;

const MAIN_URL = 'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
const MAIN_SRC = 'https://media-cdn.synkd.life/fenix.js';

const SynkdSdkNew = _ref => {
  let {
    sKey,
    tag,
    mraid = false,
    height = 400,
    width = 400,
    // styles,
    type
  } = _ref;
  const [adData, setAdData] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    getAd();
  }, []);

  const getAd = async () => {
    let body = {
      Key: sKey,
      OS: 'Android',
      Tag: tag,
      Type: 'phone',
      Keywords: [''],
      Browser: 'Chrome',
      Fingerprint: '5edd674b67ff60a6drf930cecab9010ac87b',
      Session: 'VaaaslIxayh5dG0VLdJ4gmR2u57ndA1652938560887'
    };
    const data = await fetch('https://api.synkd.life/media/a', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => {
      return res.json();
    }).then(r => {
      setAdData(r === null || r === void 0 ? void 0 : r.data);
    }).catch(error => {});
  };

  let CTA = adData === null || adData === void 0 ? void 0 : adData.CTA;
  let adURL = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Path : null;
  let adHeight = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Height : 400;
  let adwidth = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Width : 400;
  return getAdType(sKey, tag, mraid = false, height = parseInt(adHeight), width = parseInt(adwidth), // styles,
  type, adURL, CTA);
};

exports.SynkdSdkNew = SynkdSdkNew;

const getAdType = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;

  switch (type) {
    case 'superoptic':
      return SuperOptic(sKey, tag, mraid, height, width, // styles,
      type, URL, CTA);

    case 'sticky':
      return Sticky(sKey, tag, mraid, height, width, // styles,
      type, URL, CTA);

    case 'interstitial':
      return interStitial(sKey, tag, mraid, height, width, // styles,
      type, URL, CTA);

    default:
      return superoptic(sKey, tag, mraid = false, height, width, // styles,
      type, URL, CTA);
  }
};

const interStitial = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  const [modalVisible, setModalVisible] = (0, _react.useState)(true);
  const [interstitialHeight, setInterstitialHeight] = (0, _react.useState)(DeviceHeight);
  const [interstitialWidth, setInterstitialWidth] = (0, _react.useState)(DeviceWidth * 0.9);
  const [imageHeight, setImageHeight] = (0, _react.useState)(50);

  const updateAd = () => {
    setModalVisible(!modalVisible);
    setInterstitialHeight(0);
    setInterstitialWidth(0);
  };

  return URL ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: interstitialHeight,
      width: DeviceWidth
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      setInterstitialHeight(0);
    },
    style: {
      position: 'absolute',
      top: 0,
      padding: 20,
      zIndex: 1001,
      right: DeviceWidth / 2,
      transform: [{
        translateX: 50
      }],
      opacity: interstitialHeight > 0 ? 1 : 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 20,
      borderRadius: 150,
      borderWidth: 1,
      padding: 10
    }
  }, "X")), /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    style: {
      height: '100%',
      width: '100%'
    },
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: request => {
      _reactNative.Linking.openURL(request.url);
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 10
    }
  });
};

const SuperOptic = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 ? arguments[3] : undefined;
  let width = arguments.length > 4 ? arguments[4] : undefined;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  const [superOpticHeight, setSuperOpticHeight] = (0, _react.useState)(DeviceHeight);
  return URL ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      height: superOpticHeight,
      width: DeviceWidth * 0.9
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      setSuperOpticHeight(0);
    },
    style: {
      position: 'absolute',
      top: 0,
      padding: 20,
      zIndex: 1001,
      right: DeviceWidth / 2,
      transform: [{
        translateX: 50
      }],
      opacity: superOpticHeight > 0 ? 1 : 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 20,
      borderRadius: 150,
      borderWidth: 1,
      padding: 10
    }
  }, "X")), /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: request => {
      _reactNative.Linking.openURL(request.url);
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 10
    }
  });
};

const Sticky = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  const [stickyHeight, setStickyHeight] = (0, _react.useState)(height);
  return URL ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      height: stickyHeight,
      width: DeviceWidth * 0.9
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      setStickyHeight(0);
    },
    style: {
      position: 'absolute',
      top: 0,
      padding: 20,
      zIndex: 1001,
      right: DeviceWidth / 2,
      transform: [{
        translateX: 50
      }],
      opacity: stickyHeight > 0 ? 1 : 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 20,
      borderRadius: 150,
      borderWidth: 1,
      padding: 10
    }
  }, "X")), /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView // style={SDKstyles.adView}
  , {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: request => {
      _reactNative.Linking.openURL(request.url);
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 10
    }
  });
};

const defaultAd = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  return URL ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      height: height,
      width: width
    } //  styles
    ]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      flex: 1
    },
    onPress: () => _reactNative.Linking.openURL(CTA)
  }, /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: request => {
      _reactNative.Linking.openURL(request.url);
    }
  }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 10
    }
  });
};

const SDKstyles = _reactNative.StyleSheet.create({
  adView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#d3d3d3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
//# sourceMappingURL=index.js.map