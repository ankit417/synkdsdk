"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynkdSdk = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebview = require("react-native-webview");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DeviceWidth = _reactNative.Dimensions.get('window').width;

const DeviceHeight = _reactNative.Dimensions.get('window').height;

const MAIN_URL = 'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
const MAIN_SRC = 'https://media-cdn.synkd.life/fenix.js';

const Modal = _ref => {
  let {
    children,
    visible,
    minHeight,
    maxHeight,
    onClose
  } = _ref;

  const animation = _react.default.useRef(new _reactNative.Animated.Value(0));

  const [expanded, setExpanded] = _react.default.useState(false);

  _react.default.useEffect(() => {
    _reactNative.Animated.timing(animation.current, {
      toValue: expanded ? 1 : 0,
      duration: 250
    }).start();
  }, [expanded]);

  const animatedContainerStyle = {
    height: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [minHeight, maxHeight]
    })
  };
  return visible && /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [animatedContainerStyle, {
      // backgroundColor: 'yellow',
      overflow: 'hidden'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, expanded ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: SDKstyles.button,
    onPress: () => setExpanded(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: SDKstyles.buttonText
  }, "-")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: 5
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: SDKstyles.button,
    onPress: () => setExpanded(true)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: SDKstyles.buttonText
  }, "+"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: SDKstyles.button,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: SDKstyles.buttonText
  }, "x")))), children);
};

const SynkdSdk = _ref2 => {
  let {
    sKey,
    tag,
    mraid = false,
    height = 400,
    width = 400,
    // styles,
    type
  } = _ref2;
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
      console.log('res', res);
      return res.json();
    }).then(r => {
      // console.log("This is test",r?.data)
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

exports.SynkdSdk = SynkdSdk;

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

  const [visible, setVisible] = _react.default.useState(true);

  return URL ? /*#__PURE__*/_react.default.createElement(Modal, {
    visible: visible,
    minHeight: 200,
    maxHeight: DeviceHeight,
    onClose: () => setVisible(false)
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

  const [visible, setVisible] = _react.default.useState(true);

  return URL ? /*#__PURE__*/_react.default.createElement(Modal, {
    visible: visible,
    minHeight: 200,
    maxHeight: DeviceHeight,
    onClose: () => setVisible(false)
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
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 10
    }
  });
};

const Sticky = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;
  let // styles: ViewStyle,
  type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;

  const [visible, setVisible] = _react.default.useState(true);

  return URL ? /*#__PURE__*/_react.default.createElement(Modal, {
    visible: visible,
    minHeight: 200,
    maxHeight: 500,
    onClose: () => setVisible(false)
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
  return URL ? /*#__PURE__*/_react.default.createElement(Modal, {
    visible: visible,
    minHeight: 200,
    maxHeight: 500,
    onClose: () => setVisible(false)
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
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    transform: [{
      translateY: -2
    }]
  }
});
//# sourceMappingURL=index.js.map