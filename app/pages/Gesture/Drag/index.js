import React from 'react';
import {
  View, Animated, Text, PanResponder
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import Header from 'MYRN/app/components/layout/Header';

export default class GestureDrag extends React.Component {

  constructor(props){
    super(props);
    const { initPos } = this.data;
    this.state = {
      position: {
        x: new Animated.Value(initPos.x),
        y: new Animated.Value(initPos.y),
      },
      focus: false
    };
  }

  data = {
    size: 50,
    initPos: { x: 100, y: 100 }
  };

  goPos = ({ x, y, duration = 0 }) => {
    const { position } = this.state;
    Animated.parallel([
      Animated.timing(
        position.x, {toValue: x, duration, useNativeDriver: true}//结束值
      ),
      Animated.timing(
        position.y, {toValue: y, duration, useNativeDriver: true}//结束值
      ),
    ]).start();
  };

  onStart = evt => {
    console.log('允许手势');
    this.setState({ focus: true });
  };

  onMove = (evt, gestureState) => {
    const { initPos } = this.data;
    const { x0, y0, dx, dy } = gestureState;

    this.goPos({ x: initPos.x + x0 + dx, y: initPos.y + y0 + dy });
  };

  onEnd = evt => {
    this.setState({ focus: false });

    // 位置还原
    const { initPos } = this.data;
    this.goPos({
      ...initPos,
      duration: 500
    });
  };

  _gestureHandlers = () => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderStart: this.onStart,
      onPanResponderReject: () => { console.log('禁止手势'); },
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onEnd
    }).panHandlers;
  };

  render() {
    const { position, focus } = this.state;
    const { size } = this.data;
    return (
      <Page>
        <Header />
        <View style={styles.page}>
          <Animated.View
            style={{
              ...styles.container,
              ...(focus? styles.focus: {}),
              width: size, height: size, borderRadius: Math.floor(size/2),
              transform: [{
                translateX: position.x
              }, {
                translateY: position.y
              }]
            }} {...this._gestureHandlers()}>
            <Text style={{
              ...styles.text,
              ...(focus? styles.textFocus: {}),
            }}>拖</Text>
          </Animated.View>
        </View>
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  page: {
    flex: 1, position: 'relative'
  },
  container: {
    backgroundColor: '#fc6621',
    alignItems: 'center', justifyContent: 'center'
  },
  focus: {
    backgroundColor: '#f5222d'
  },
  text: {
    color: '#fff', fontSize: 24
  },
  textFocus: {
    fontSize: 28, fontWeight: 'bold'
  }
});
