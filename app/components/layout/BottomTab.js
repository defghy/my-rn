import React from 'react';
import { View } from 'react-native';

class BottomBar extends React.Component {
  state = {

  };

  componentDidMount() {

  }
  render() {
    const { len } = this.state;
    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          opacity: this.state.fade,         // 将透明度指定为动画变量值
        }}
      >
      <Svg
          width="300"
          height="300"
          fill="#fff"
          stroke="#00f"
          color="#f00"
          viewBox="0 0 400 400"
      >
        <Circle cx="200" cy="200" r="200" fill="#fdd" stroke="none" />
        <AnimatedPath d={this.state.path} stroke="#0f0" strokeWidth="32" />
      </Svg>
      </Animated.View>
    );
  }
}

export default BottomBar;