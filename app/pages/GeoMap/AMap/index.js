import React from 'react';
import {
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';
import { MapView } from 'react-native-amap3d';

export default class RNWebView extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <Page>
        <Header />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            coordinate={{
              latitude: 39.91095,
              longitude: 116.37296,
            }}
          />
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
