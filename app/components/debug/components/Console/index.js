import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import debounce from 'lodash/debounce'
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
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
let messages = [];
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
    comp = null;
  }

  handlers = CONSOLE_METHOD.reduce((data, funName) => {
    data[funName] = (msgItem) => {
      this.state.messages.push(msgItem);
      this.debounceRender()
    };
    return data;
  }, {})

  debounceRender = debounce(() => {
    this.setState({
      messages: [...this.state.messages]
    });
  }, 300)

  clearConsole = () => {
    const { messages } = this.state;
    messages.splice(0, messages.length)
    this.setState({
      messages: [...messages]
    });
  }

  openLogItem = (msgItem) => {
    msgItem.isOpen = !msgItem.isOpen;
    this.setState({
      messages: [...this.state.messages]
    });
  }

  _renderLogItem(msgItem) {
    const { type } = msgItem;

    if (!msgItem.output) {
      msgItem.output = formatConsole(msgItem)
    }

    const { msg, detail = '' } = msgItem.output
    return (
      <TouchableHighlight
        onPress={() => this.openLogItem(msgItem)}
        underlayColor="#f5f5f9"
        key={msgItem.uid}
      >
        <View
          style={{
            ...logStyles.common,
            ...(logStyles[type] || {}),
          }}
        >
          <HTML
            html={msg}
            baseFontStyle={{
              ...logTextStyles.common,
              ...(logTextStyles[type] || {}),
            }}
          />
          { !!msgItem.isOpen && !!detail &&
            <HTML
              html={detail}
              containerStyle={logStyles.detail}
              baseFontStyle={{
                ...logTextStyles.common,
                ...(logTextStyles[type] || {}),
              }}
            />
          }
        </View>
      </TouchableHighlight>
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
  detail: {
    paddingVertical: 10, paddingLeft: 5
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
