import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>详情页</Text>
      </View>
    );
  }
}

export default Test;