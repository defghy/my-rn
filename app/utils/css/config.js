import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

EStyleSheet.build({
  $rem: +(width / 375).toFixed(2)
});