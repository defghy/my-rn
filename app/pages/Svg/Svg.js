import React from 'react';
import { View, Text, PanResponder } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

import CirProgress from './components/CirProgress';

class SvtTest extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <Page>
        <Header />
        <View style={styles.body}>
          <CirProgress />
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1
  }
});

export default SvtTest;