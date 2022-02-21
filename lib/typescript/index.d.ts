/// <reference types="react" />
import { ViewStyle } from 'react-native';
interface SynkdSdkProps {
    sKey: string;
    tag: number;
    mraid?: boolean;
    height?: number;
    width?: number;
    styles?: ViewStyle;
}
export declare const SynkdSdk: ({ sKey, tag, mraid, height, width, styles, }: SynkdSdkProps) => JSX.Element;
export {};
