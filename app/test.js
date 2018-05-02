import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Test extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '分类',
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="md-pricetags" size={25} color={tintColor} />
    // )
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="跳转测试"
          onPress={() => this.props.navigation.navigate('detail')}
        />
      </View>
    );
  }
}

export default Test;