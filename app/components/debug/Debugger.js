import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { goBack, fetchCurrRoute } from 'MYRN/app/utils/route';

class DebugTool extends Component {

  static defaultProps = {
    left: null,  // 左侧组件
    leftAction: goBack, // 左侧行为
    title: '',   // 标题
    right: null   // 右侧组件
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  render () {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          horizontal
          style={styles.topBanner}
        >
          <Text>胡雨</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '80%',
    position: 'absolute', bottom: 0,
    backgroundColor: '#fff', opacity: 0.9
  },
  topBanner: {
    backgroundColor: 'rgb(33, 150, 243)',
    width: '100%', height: 30,
  }
});

export default DebugTool;
