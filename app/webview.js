import React, { Component } from 'react';
import {
  StyleSheet, WebView, Button, View
} from 'react-native';

const uri = 'http://online.yunshanmeicai.com/entry/index'

export default class MCWebview extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '测试',
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="md-pricetags" size={25} color={tintColor} />
    // )
  });

  state = {
    uri: uri
  };

  reload() {
    // 重新加载初始页面
    this.setState({
      uri: uri+'?t='+ new Date().getTime()
    });
    //this.refs._webview.reload();
  }

  jump() {
    this.props.navigation.navigate('detail')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btns}>
          <Button
            title="刷新"
            onPress={() => this.reload()}
          />
          <Button
            title="跳转测试"
            onPress={() => this.jump()}
          />
        </View>

        <WebView
          ref="_webview"
          source={{uri: this.state.uri}}
          style={styles.webview}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    width: '100%',
    height: '100%'
  },
  webview: {
    flex: 1
  },
  btns: {
    flexDirection: 'row'
  }
});