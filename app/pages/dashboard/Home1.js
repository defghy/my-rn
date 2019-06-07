import React, { Component } from 'react';
import {
  Button, View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import BottomTab from 'MYRN/app/components/layout/BottomTab';

export default class MCWebview extends Component {

  state = {

  };

  render() {
    return (
      <Page>
        <View style={styles.body}></View>
        <BottomTab />
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1
  },
});