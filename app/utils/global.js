import { Dimensions, Platform, StatusBar } from 'react-native';

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get('window');

export const IS_IPHONEX = (function() {
  const iphones = {
    'x': [375, 812],
    'xsmax': [414, 896]
  };
  const [w, h] = [Math.min(DEVICE_WIDTH, DEVICE_HEIGHT), Math.max(DEVICE_WIDTH, DEVICE_HEIGHT)];
  return Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    !!Object.values(iphones).find(([iw, ih]) => (iw === w && ih === h));
})();

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ?
  (IS_IPHONEX ? 44 : 20) : StatusBar.currentHeight;

export const BASE_URL = 'https://crm-manager.stage.yunshanmeicai.com';