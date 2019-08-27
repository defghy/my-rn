import React from 'react';
import {
  Animated, PanResponder
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { DEVICE_WIDTH, DEVICE_HEIGHT } from 'MYRN/app/utils/global'

const dragable = (({ size = 50, initPos = { x: 0, y: 0 } }) => (Content) =>
  class Dragable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        position: {
          x: new Animated.Value(initPos.x),
          y: new Animated.Value(initPos.y),
        },
        focus: false
      };
    }

    currPos = { ...initPos };

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
      const { x0, y0, dx, dy } = gestureState;
      const { currPos } = this;

      this.goPos({ x: currPos.x + x0 + dx, y: currPos.y + y0 + dy });
    };

    onEnd = (evt, gestureState) => {
      this.setState({
        focus: false
      });

      const { currPos } = this;
      const { x0, y0, dx, dy } = gestureState;
      // 限定边界
      const destPos = { x: currPos.x + x0 + dx, y: currPos.y + y0 + dy};
      destPos.x = Math.max(0, destPos.x);
      destPos.x = Math.min(DEVICE_WIDTH - size, destPos.x);
      destPos.y = Math.max(0, destPos.y);
      destPos.y = Math.min(DEVICE_HEIGHT - size, destPos.y);

      this.currPos = destPos;

      // 位置还原
      this.goPos({
        ...destPos,
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
      return (
        <Animated.View
          style={{
            ...styles.container,
            width: size, height: size,
            transform: [{
              translateX: position.x
            }, {
              translateY: position.y
            }]
          }} {...this._gestureHandlers()}>
          <Content focus={focus} />
        </Animated.View>
      );
    }

  }
);

const styles = EStyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'absolute', left: 0, top: 0,
    alignItems: 'center', justifyContent: 'center'
  }
});

export default dragable;
