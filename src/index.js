import React, { useState, useEffect } from 'react';
import {
  View,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  Image,
  Animated,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const MAIN_URL =
  'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
const MAIN_SRC = 'https://media-cdn.synkd.life/fenix.js';

const AdModal = ({ children, visible, minHeight, maxHeight, onClose }) => {
  const animation = React.useRef(new Animated.Value(0));
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(animation.current, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const animatedContainerStyle = {
    height: animation.current.interpolate({
      inputRange: [0, 1],
      outputRange: [minHeight, maxHeight],
    }),
  };

  return (
    visible && (
      <Animated.View
        style={[
          animatedContainerStyle,
          {
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {expanded ? (
              <>
                <TouchableOpacity
                  style={SDKstyles.button}
                  onPress={() => setExpanded(false)}
                >
                  <Text style={SDKstyles.buttonText}>-</Text>
                </TouchableOpacity>
                <View style={{ width: 5 }} />
              </>
            ) : (
              <TouchableOpacity
                style={SDKstyles.button}
                onPress={() => setExpanded(true)}
              >
                <Text style={SDKstyles.buttonText}>+</Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            <TouchableOpacity style={SDKstyles.button} onPress={onClose}>
              <Text style={SDKstyles.buttonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>

        {children}
      </Animated.View>
    )
  );
};

const FullScreenAd = ({ children, refresh }) => {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    if (!modalVisible) {
      setModalVisible(true);
    }
  }, [refresh]);
  return (
    // <View style={{flex:1, backgroundColor:'red'}}>

    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      style={{
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
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View style={{ flex: 1, minHeight: 300 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={SDKstyles.button}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={SDKstyles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export const SynkdSdk = ({
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles,
  type,
  refresh,
}) => {
  const [adData, setAdData] = useState(null);
  useEffect(() => {
    getAd();
  }, [refresh]);

  const getAd = async () => {
    let body = {
      Key: sKey,
      OS: 'Android',
      Tag: tag,
      Type: 'phone',
      Keywords: [''],
      Browser: 'Chrome',
      Fingerprint: '5edd674b67ff60a6drf930cecab9010ac87b',
      Session: 'VaaaslIxayh5dG0VLdJ4gmR2u57ndA1652938560887',
    };
    const data = await fetch('https://api.synkd.life/media/a', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log('res', res);
        return res.json();
      })
      .then((r) => {
        // console.log("This is test",r?.data)
        setAdData(r?.data);
      })
      .catch((error) => {});
  };
  console.log('refresh synkd', refresh);
  let CTA = adData?.CTA;
  let adURL = adData?.Creative.length > 0 ? adData?.Creative[0].Path : null;
  let adHeight = adData?.Creative.length > 0 ? adData?.Creative[0].Height : 400;
  let adwidth = adData?.Creative.length > 0 ? adData?.Creative[0].Width : 400;

  return getAdType(
    sKey,
    tag,
    (mraid = false),
    (height = parseInt(adHeight)),
    (width = parseInt(adwidth)),
    // styles,
    type,
    adURL,
    CTA,
    refresh
  );
};

const getAdType = (
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
  refresh
) => {
  switch (type) {
    case 'superoptic':
      return SuperOptic(
        sKey,
        tag,
        mraid,
        height,
        width,
        // styles,
        type,
        URL,
        CTA,
        refresh
      );

    case 'sticky':
      return Sticky(
        sKey,
        tag,
        mraid,
        height,
        width,
        // styles,
        type,
        URL,
        CTA,
        refresh
      );
    case 'interstitial':
      return interStitial(
        sKey,
        tag,
        mraid,
        height,
        width,
        // styles,
        type,
        URL,
        CTA,
        refresh
      );
    default:
      return superoptic(
        sKey,
        tag,
        (mraid = false),
        height,
        width,
        // styles,
        type,
        URL,
        CTA,
        refresh
      );
  }
};

const interStitial = (
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
  refresh
) => {
  console.log('interstitial', refresh);
  return URL ? (
    <FullScreenAd refresh={refresh}>
      <WebView
        originWhitelist={['*']}
        source={{
          // uri:"https://www.google.com"
          uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={(event) => {
          const isExternalLink =
            Platform.OS === 'ios' ? event.navigationType === 'click' : true;
          if (isExternalLink) {
            Linking.openURL(event.url);
            return false;
          }
          return true;
        }}
        mediaPlaybackRequiresUserAction
        style={{ flex: 1 }}
      />
    </FullScreenAd>
  ) : (
    <View style={{ height: 10 }} />
  );
};

const SuperOptic = (
  sKey,
  tag,
  mraid = false,
  height,
  width,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
  refresh
) => {
  const [visible, setVisible] = React.useState(true);
  useEffect(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [refresh]);

  return URL ? (
    <AdModal
      visible={visible}
      minHeight={200}
      maxHeight={DeviceHeight}
      onClose={() => setVisible(false)}
    >
      <WebView
        originWhitelist={['*']}
        source={{
          uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={(event) => {
          const isExternalLink =
            Platform.OS === 'ios' ? event.navigationType === 'click' : true;
          if (isExternalLink) {
            Linking.openURL(event.url);
            return false;
          }
          return true;
        }}
        mediaPlaybackRequiresUserAction
      />
    </AdModal>
  ) : (
    <View style={{ height: 10 }} />
  );
};

const Sticky = (
  sKey,
  tag,
  mraid = false,
  height = height,
  width = 300,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
  refresh
) => {
  const [visible, setVisible] = React.useState(true);
  useEffect(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [refresh]);
  return URL ? (
    <AdModal
      visible={visible}
      minHeight={200}
      maxHeight={height * 1.1}
      onClose={() => setVisible(false)}
    >
      <WebView
        originWhitelist={['*']}
        source={{
          uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        onShouldStartLoadWithRequest={(event) => {
          const isExternalLink =
            Platform.OS === 'ios' ? event.navigationType === 'click' : true;
          if (isExternalLink) {
            Linking.openURL(event.url);
            return false;
          }
          return true;
        }}
        mediaPlaybackRequiresUserAction
      />
    </AdModal>
  ) : (
    <View style={{ height: 10 }} />
  );
};

const defaultAd = (
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles: ViewStyle,
  type,
  URL,
  CTA
) => {
  return URL ? (
    <AdModal
      visible={visible}
      minHeight={200}
      maxHeight={500}
      onClose={() => setVisible(false)}
    >
      <WebView
        originWhitelist={['*']}
        source={{
          uri: `${MAIN_URL}src=${MAIN_SRC}&tag=${tag}&key=${sKey}&mraid=${mraid}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onShouldStartLoadWithRequest={(event) => {
          const isExternalLink =
            Platform.OS === 'ios' ? event.navigationType === 'click' : false;
          if (isExternalLink) {
            Linking.openURL(event.url);
            return false;
          }
          return true;
        }}
      />
    </AdModal>
  ) : (
    <View style={{ height: 10 }} />
  );
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#d3d3d3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    transform: [
      {
        translateY: -2,
      },
    ],
  },
});
