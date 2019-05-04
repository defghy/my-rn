import React from 'react';
import { View, Text, PanResponder } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Svg from './Component/svg.js';

class Detail extends React.Component {

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      debugger;
    },
  });

  componentDidMount() {
  
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} {...this._panResponder.panHandlers} >
        <Text>详情页</Text>
        <View style={{width: '100%', height: 500}}>
          <Svg />
        </View>
      </View>
    );
  }
}

export default Detail;