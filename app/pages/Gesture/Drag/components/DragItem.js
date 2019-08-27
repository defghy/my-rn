import React from 'react';
import {
  View, Animated, Text, PanResponder
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import dragable from 'MYRN/app/components/hoc/Dragable'

const SIZE = 50;
@dragable({ size: SIZE })
class GestureDrag extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const { focus } = this.props;
    return (
      <View
        style={{
          ...styles.container,
          ...(focus? styles.focus: {}),
          width: SIZE, height: SIZE, borderRadius: Math.floor(SIZE/2)
        }}>
        <Text style={{
          ...styles.text,
          ...(focus? styles.textFocus: {}),
        }}>拖</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fc6621',
    alignItems: 'center', justifyContent: 'center'
  },
  focus: {
    backgroundColor: '#f5222d'
  },
  text: {
    color: '#fff', fontSize: 24
  },
  textFocus: {
    fontSize: 28, fontWeight: 'bold'
  }
});

export default GestureDrag
