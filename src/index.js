import React, {useState, useEffect} from 'react';
import {
  View,
  ViewStyle,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';
import {WebView} from 'react-native-webview';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const URL =
  'https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?';
const SRC = 'https://media-cdn.synkd.life/fenix.js';

export const SynkdSdk = ({
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles,
  type,
}) => {
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
        return res.json();
      })
      .then((r) => {
        setAdData(r?.data);
      })
      .catch((error) => {});
  };

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
      );
    default:
      return defaultAd(
        sKey,
        tag,
        (mraid = false),
        height,
        width,
        // styles,
        type,
        URL,
        CTA,
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
) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [interstitialHeight, setInterstitialHeight] = useState(DeviceHeight);
  const [interstitialWidth, setInterstitialWidth] = useState(DeviceWidth);

  const updateAd = () => {
    setModalVisible(!modalVisible);
    setInterstitialHeight(0);
    setInterstitialWidth(0);
  };
  return URL ? (
    <View
      style={[
        {
          height: interstitialHeight,
          width: interstitialWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        },
      ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => Linking.openURL(CTA)}>
          <WebView
            style={SDKstyles.adView}
            originWhitelist={['*']}
            source={{
              uri: URL,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[SDKstyles.button, SDKstyles.buttonClose]}
          onPress={() => updateAd()}>
          <Text style={SDKstyles.textStyle}>close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  ) : (
    <View style={{height: 10}} />
  );
};

const SuperOptic = (
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
) => {
  return URL ? (
    <View
      style={[
        {
          height: DeviceHeight,
        },
      ]}>
      <TouchableOpacity style={{flex: 1}} onPress={() => Linking.openURL(CTA)}>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: URL,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{height: 10}} />
  );
};

const Sticky = (
  sKey,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  // styles: ViewStyle,
  type,
  URL,
  CTA,
) => {
  return URL ? (
    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
      <TouchableOpacity style={{flex: 1}} onPress={() => Linking.openURL(CTA)}>
        <WebView
          style={SDKstyles.adView}
          originWhitelist={['*']}
          source={{
            uri: URL,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{height: 10}} />
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
  CTA,
) => {
  return URL ? (
    <View
      style={[
        {height: height, width: width},
        //  styles
      ]}>
      <TouchableOpacity style={{flex: 1}} onPress={() => Linking.openURL(CTA)}>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: URL,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{height: 10}} />
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
});
