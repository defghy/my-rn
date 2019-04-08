import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Svg from './Component/svg.js';

class Detail extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>详情页</Text>
        <View style={{width: '100%', height: 300}}>
          <Svg style={{width: '100%', height: '100%'}}/>
        </View>
      </View>
    );
  }
}

export default Detail;