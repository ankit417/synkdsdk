import React from "react";
import { View ,ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

interface SynkdSdkProps {
  key: number;
  src: string;
  tag: string;
  mraid?: boolean;
  height?: number;
  width?: number;
  styles?: ViewStyle;
}

export const SynkdSdk = ({
  src,
  key,
  tag,
  mraid = false,
  height = 400,
  width = 400,
  styles,
}: SynkdSdkProps) => {
  const URL =
    "https://insprep.s3.eu-west-1.amazonaws.com/SDK/apptags/adsdk2.html?";
  return (
    <View style={[{ height: height, width: width }, styles]}>
      <WebView
        source={{
          uri: `${URL}src=${src}&tag=${tag}&key=${key}&mraid=${mraid}`,
        }}
      />
    </View>
  );
};
