import React from 'react';
import { Animated } from 'react-native';
import Svg,{
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const ani = new Animated.Value(0);

class SvgTest extends React.Component {
  state = {
    len: new Animated.Value(0),
    fade: new Animated.Value(0),
    animatedFill: new Animated.Value(0),
    path: ani.interpolate({
      inputRange: [0, 1],
      outputRange: [`M0,0L0,0`, `M0,0L400,400`],
    })
  };

  componentDidMount() {
    setInterval(() => {
      const { len } = this.state;
      if (len<=400) {
        this.setState({
          len: len + 20
        });
      }
    }, 1000);  
    const fadeAni = Animated.timing(                  // 随时间变化而执行动画
      this.state.fade,            // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 500,              // 让动画持续一段时间
        useNativeDriver: true
      }
    );

    const lenAni = Animated.timing(                  // 随时间变化而执行动画
      ani,            // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 3000
      }
    );  

    Animated.parallel([fadeAni, lenAni]).start();
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

export default SvgTest;