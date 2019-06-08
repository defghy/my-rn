import React, { Component } from 'react';
import {
  Button, View, Text, TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import BottomTab from 'MYRN/app/components/layout/BottomTab';

@withNavigation
class Home extends Component {

  state = {

  };

  goWebview = () => {
    this.props.navigation.push('/webview/index', {
      url: 'https://crm-mobile.stage.yunshanmeicai.com/groupLeaderSplit/mine'
    });
  }

  render() {
    return (
      <Page>
        <View style={styles.body}>
          <TouchableHighlight
            onPress={this.goWebview}>
              <Text>跳转测试</Text>
          </TouchableHighlight>
        </View>
        <BottomTab page="FUNC" />
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1
  },
});

export default Home;