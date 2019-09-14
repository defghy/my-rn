import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';

import { formatConsole } from './util';

const CONSOLE_METHOD = [
  'log',
  'error',
  'info',
  'warn',
  // 'dir',
  // 'time',
  // 'timeEnd',
  // 'clear',
  // 'table',
  // 'assert',
  // 'count',
  // 'debug'
];
const winConsole = console;
const messages = [];
let comp = null;

// 全局开关
if (global.USE_DEBUG) {
  CONSOLE_METHOD.forEach(name => {
    let origin = winConsole[name].bind(winConsole) || function() {};

    winConsole[name] = (...args) => {
      // 封装数据
      const uid = `${new Date().getTime()}_${Math.random()}`;
      const msgItem = {type: name, args, uid }
      if (comp) {
        const handler = comp.handlers[name];
        if (args.length > 0 && handler) {
          handler(msgItem);
        }
      } else {
        messages.push(msgItem);
      }

      // 原始调用
      origin(...args);
    }
  })
}

class Console extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      messages
    };
  }

  componentDidMount () {
    comp = this;  // 抛弃本组件初始化的错误，防止死循环
  }

  componentWillUnmount() {

  }

  handlers = CONSOLE_METHOD.reduce((data, funName) => {
    data[funName] = (msgItem) => {
      const { messages } = this.state;
      messages.push(msgItem);
      this.setState({
        messages: [...messages]
      });
    };
    return data;
  }, {})

  clearConsole = () => {
    this.setState({
      messages: []
    });
  }

  _renderLogItem(msgItem) {
    const { type } = msgItem;

    const { msg, detail = '' } = formatConsole(msgItem) || `<div><span style="color: #a71d5d;">a</span>: <span style="color: #0086b3;">1</span>, <span style="color: #a71d5d;">b</span>: <span style="color: #0086b3;">2</span>, <span style="color: #a71d5d;">c</span>: <span style="color: #0086b3;">3</span>, <span style="color: #a71d5d;">ddafasdfasdfasfdf</span>: <span style="color: #0086b3;">4</span>, <span style="color: #a71d5d;">sadfasdfasdfdasf</span>: <span style="color: #0086b3;">5</span></div>`
    return (
      <View
        key={msgItem.uid}
        style={{
          ...logStyles.common,
          ...(logStyles[type] || {}),
        }}
      >
        {/*        <HTMLView
          value={htmlStr}
        />*/}
        <HTML
          html={msg}
          baseFontStyle={{
            ...logTextStyles.common,
            ...(logTextStyles[type] || {}),
          }}
        />
      </View>
    );
  }

  render () {
    const { messages } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.controlPanel}>
          <TouchableHighlight
            onPress={this.clearConsole}
            style={styles.clear}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Icon name="delete" style={styles.clearIcon} />
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.body}>
          { messages.map(item => this._renderLogItem(item)) }
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '100%'
  },
  controlPanel: {
    height: '40rem',
    paddingHorizontal: '10rem',
    flexDirection: 'row', alignItems: 'center',
    borderColor: '#eceffe', borderBottomWidth: 1
  },
  clear: {
    width: '40rem', height: '100%',
    alignItems: 'center', justifyContent: 'center'
  },
  clearIcon: {
    fontSize: '24rem', color: '#707d8b', height: '24rem'
  },
  body: {
    flex: 1
  }
});

const logStyles = EStyleSheet.create({
  common: {
    borderBottomWidth: 1,
    paddingVertical: 3, paddingLeft: 10
  },
  warn: {
    backgroundColor: '#fffbe6', borderColor: '#ffc107',
  },
  log: {
    borderColor: '#eceffe'
  },
  error: {
    backgroundColor: '#ffebee', borderColor: '#f44336',
  },
  info: {
    borderColor: '#eceffe'
  }
});

const logTextStyles = EStyleSheet.create({
  common: {
    fontSize: 12, fontWeight: 'bold'
  },
  warn: {

  },
  log: {

  },
  error: {
    color: '#f44336'
  },
  info: {
    color: '#2196f3'
  }
});

export default Console;
