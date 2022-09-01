import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Linking, Image, Animated, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import EXPAND from './assets/expand.png';
import MINIMIZE from './assets/minimize.png';
import CLOSE from './assets/close.png';
const DeviceHeight = Dimensions.get('window').height;
const platform = Platform.OS === "ios" ? true : false;
const MAIN_URL = 'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
const MAIN_SRC = 'https://media-cdn.synkd.life/fenix.js';

const AdModal = _ref => {
  let {
    children,
    visible,
    minHeight,
    maxHeight,
    onClose
  } = _ref;
  const animation = React.useRef(new Animated.Value(0));
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(() => {
    Animated.timing(animation.current, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [expanded]);
  const animatedContainerStyle = {
    height: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [minHeight, maxHeight]
    })
  };
  return visible && /*#__PURE__*/React.createElement(Animated.View, {
    style: [animatedContainerStyle, {
      overflow: 'hidden'
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    }
  }, expanded ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [SDKstyles.button, {
      zIndex: 3
    }],
    onPress: () => setExpanded(false)
  }, /*#__PURE__*/React.createElement(Image, {
    source: MINIMIZE,
    style: {
      height: 24,
      width: 24
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      width: 5
    }
  })) : /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [SDKstyles.button, {
      zIndex: 3
    }],
    onPress: () => setExpanded(true)
  }, /*#__PURE__*/React.createElement(Image, {
    source: EXPAND,
    style: {
      height: 24,
      width: 24
    }
  }))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [SDKstyles.button, {
      zIndex: 3
    }],
    onPress: onClose
  }, /*#__PURE__*/React.createElement(Image, {
    source: CLOSE,
    style: {
      height: 24,
      width: 24
    }
  })))), children);
};

const FullScreenAd = _ref2 => {
  let {
    children,
    refresh
  } = _ref2;
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    setModalVisible(true);
  }, [refresh]);
  return /*#__PURE__*/React.createElement(Modal, {
    visible: modalVisible,
    onRequestClose: () => {
      setModalVisible(false);
    },
    style: {
      flex: 1,
      backgroundColor: 'yellow',
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
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      minHeight: 300
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }, platform && SDKstyles.interStitialModalStyle]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [SDKstyles.button, SDKstyles.closeButton],
    onPress: () => {
      setModalVisible(false);
    }
  }, /*#__PURE__*/React.createElement(Image, {
    source: CLOSE,
    style: {
      height: 24,
      width: 24
    }
  }))), children));
};

export const SynkdSdk = _ref3 => {
  let {
    sKey,
    tag,
    mraid = false,
    height = 400,
    width = 400,
    type,
    refresh
  } = _ref3;
  const [adData, setAdData] = useState(null);
  useEffect(() => {
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
      setAdData(r === null || r === void 0 ? void 0 : r.data);
    }).catch(error => {});
  };

  let CTA = adData === null || adData === void 0 ? void 0 : adData.CTA;
  let adURL = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Path : null;
  let adHeight = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Height : 400;
  let adwidth = (adData === null || adData === void 0 ? void 0 : adData.Creative.length) > 0 ? adData === null || adData === void 0 ? void 0 : adData.Creative[0].Width : 400;
  return getAdType(sKey, tag, mraid = false, height = parseInt(adHeight), width = parseInt(adwidth), type, adURL, CTA, refresh);
};

const getAdType = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
  let type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  let refresh = arguments.length > 8 ? arguments[8] : undefined;

  switch (type) {
    case 'superoptic':
      return SuperOptic(sKey, tag, mraid, height, width, type, URL, CTA, refresh);

    case 'sticky':
      return Sticky(sKey, tag, mraid, height, width, type, URL, CTA, refresh);

    case 'interstitial':
      return interStitial(sKey, tag, mraid, height, width, type, URL, CTA, refresh);

    default:
      return superoptic(sKey, tag, mraid = false, height, width, type, URL, CTA, refresh);
  }
};

const interStitial = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
  let type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  let refresh = arguments.length > 8 ? arguments[8] : undefined;
  return URL ? /*#__PURE__*/React.createElement(FullScreenAd, {
    refresh: refresh
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      position: 'absolute',
      top: platform ? 60 : 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: event => {
      const isExternalLink = Platform.OS === 'ios' ? event.navigationType === 'click' : true;

      if (isExternalLink) {
        Linking.openURL(event.url);
        return false;
      }

      return true;
    },
    mediaPlaybackRequiresUserAction: true,
    style: {
      flex: 1
    }
  }))) : /*#__PURE__*/React.createElement(View, {
    style: {
      height: 10
    }
  });
};

const SuperOptic = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 ? arguments[3] : undefined;
  let width = arguments.length > 4 ? arguments[4] : undefined;
  let type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  let refresh = arguments.length > 8 ? arguments[8] : undefined;
  const [visible, setVisible] = React.useState(true);
  useEffect(() => {
    setVisible(true);
  }, [refresh]);
  return URL ? /*#__PURE__*/React.createElement(AdModal, {
    visible: visible,
    minHeight: 200,
    maxHeight: DeviceHeight,
    onClose: () => setVisible(false)
  }, /*#__PURE__*/React.createElement(View, {
    style: SDKstyles.adModalWebWrapper
  }, /*#__PURE__*/React.createElement(WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    onShouldStartLoadWithRequest: event => {
      const isExternalLink = Platform.OS === 'ios' ? event.navigationType === 'click' : true;

      if (isExternalLink) {
        Linking.openURL(event.url);
        return false;
      }

      return true;
    },
    mediaPlaybackRequiresUserAction: true
  }))) : /*#__PURE__*/React.createElement(View, {
    style: {
      height: 10
    }
  });
};

const Sticky = function (sKey, tag) {
  let mraid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : height;
  let width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;
  let type = arguments.length > 5 ? arguments[5] : undefined;
  let URL = arguments.length > 6 ? arguments[6] : undefined;
  let CTA = arguments.length > 7 ? arguments[7] : undefined;
  let refresh = arguments.length > 8 ? arguments[8] : undefined;
  const [visible, setVisible] = React.useState(true);
  useEffect(() => {
    setVisible(true);
  }, [refresh]);
  return URL ? /*#__PURE__*/React.createElement(AdModal, {
    visible: visible,
    minHeight: 200,
    maxHeight: height * 1.1,
    onClose: () => setVisible(false)
  }, /*#__PURE__*/React.createElement(View, {
    style: SDKstyles.adModalWebWrapper
  }, /*#__PURE__*/React.createElement(WebView, {
    originWhitelist: ['*'],
    source: {
      uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`
    },
    javaScriptEnabled: true,
    domStorageEnabled: true,
    startInLoadingState: true,
    scalesPageToFit: true,
    scrollEnabled: true,
    onShouldStartLoadWithRequest: event => {
      const isExternalLink = Platform.OS === 'ios' ? event.navigationType === 'click' : true;

      if (isExternalLink) {
        Linking.openURL(event.url);
        return false;
      }

      return true;
    },
    mediaPlaybackRequiresUserAction: true
  }))) : /*#__PURE__*/React.createElement(View, {
    style: {
      height: 10
    }
  });
};

export const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  const toogleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return {
    refresh,
    toogleRefresh
  };
};
const SDKstyles = StyleSheet.create({
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
  adModalWebWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    position: 'absolute'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  closeButton: {
    zIndex: 3,
    top: 8,
    right: 8,
    backgroundColor: '#7F7F7F'
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    transform: [{
      translateY: -2
    }]
  },
  interStitialModalStyle: {
    position: 'absolute',
    top: 60,
    right: 0,
    zIndex: 100
  }
});
//# sourceMappingURL=index.js.map