import React from 'react';
import {
  View
} from 'react-native';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import { messageHandler } from './handler';

export default class RNWebView extends React.Component {

  constructor(props){
    super(props);
    const { navigation } = props;
    this.webUrl = navigation.getParam('url');
    this.state = {
      loadError: false
    };
  }

  _emptyComponent = () => {
    return(
      <View style={[styles.outerContainer]}>
        <Text>网页加载失败</Text>
      </View>
    );
  }

  _onMessage = messageHandler;

  render() {
    const { loadError } = this.state;
    return (
      <Page>
        {(!loadError) ? (
          <WebView
            ref={(view) => { this.webView = view }}
            automaticallyAdjustContentInsets
            onMessage={e => this._onMessage(e)}
            source={{ uri: this.webUrl }}
            renderError={() => this.setState({ loadError: true})}
            onError={() => this.setState({ loadError: true})}
            nativeConfig={{ props: {
              webContentsDebuggingEnabled: true
            } }}
            useWebKit
            allowsInlineMediaPlayback
            userAgent={`${DeviceInfo.getUserAgent()} myrn`}
          />
        ) : this._emptyComponent()}
      </Page>
    );
  }
}

const styles = EStyleSheet.create({

});
