import React from 'react';
import { View, Text, PanResponder, NativeModules } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { HelloWorld } = NativeModules;

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';


class TestNative extends React.Component {

  state = {
    message: '加载中。。。'
  };

  componentDidMount = () => {
    this.callNative();
  }

  callNative = async () => {
    if (HelloWorld) {
      const message = await HelloWorld.sayHello();
      this.setState({
        message
      });
    }
  }

  render() {
    return (
      <Page>
        <Header />
        <View style={styles.body}>
          <Text>{this.state.message}</Text>
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  }
});

export default TestNative;