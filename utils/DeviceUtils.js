import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

function isIphoneX() {
    return (Platform.OS === 'ios' && DeviceInfo.getModel().indexOf('iPhone X') !== -1);
}

function ifIsIphoneX(iphoneXStyle,originalStyle) {
    return isIphoneX() ? iphoneXStyle: originalStyle;
}

export default { isIphoneX,ifIsIphoneX }