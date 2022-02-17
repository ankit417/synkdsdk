/// <reference types="react" />
import { ViewStyle } from "react-native";
interface SynkdSdkProps {
    key: number;
    tag: string;
    mraid?: boolean;
    height?: number;
    width?: number;
    styles?: ViewStyle;
}
export declare const SynkdSdk: ({ key, tag, mraid, height, width, styles, }: SynkdSdkProps) => JSX.Element;
export {};
