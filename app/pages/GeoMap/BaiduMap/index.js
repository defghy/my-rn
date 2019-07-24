import React from 'react';
import {
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

export default class RNWebView extends React.Component {

  constructor(props){
    super(props);
    const { navigation } = props;
    this.webUrl = navigation.getParam('url');
    this.state = {
      loadError: false
    };
  }

  render() {
    const { infoWindowProps } = this.state;
    console.warn('Overlay', Overlay)
    return (
      <Page>
        <Header />
        <View style={styles.container}>
          暂无
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
  }
});
