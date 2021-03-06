import React from 'react'
import { Animated } from 'react-native';
import Svg, {
  Path,
  Circle,
  Text,
  Polyline,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';

/**
 * 获取圆周的坐标值
 * @param cx 圆心x
 * @param cy 圆心y
 * @param r  半径
 * @param angle 角度，以y轴开始
 * @returns {*[]}
 */
const arcPoint = (cx, cy, r, angle) => {
  const radian = (angle) => angle * (Math.PI / 180);
  return [cx + r * Math.sin(radian(angle)), cy - r * Math.cos(radian(angle))];
};

/**
 * 正圆的弧形
 * @param cx  圆心x
 * @param cy  圆心y
 * @param rMin  内半径
 * @param rMax  外半径
 * @param angleStart  起始角度
 * @param angleEnd  结束角度
 * @returns {{d: string}}
 */
const arc = (cx, cy, rMin, rMax, angleStart, angleEnd) => {
  const largeArcFlag = angleEnd - angleStart > 180 ? 1 : 0;

  const gap = (rMax - rMin)/2;
  const d = [
    `M${arcPoint(cx, cy, rMin, angleStart).join(',')}`,
    `L${arcPoint(cx, cy, rMax, angleStart).join(',')}`,
    `A${rMax},${rMax} 0 ${largeArcFlag},1 ${arcPoint(cx, cy, rMax, angleEnd).join(',')}`,
    `A${gap},${gap} 0 1, 1 ${arcPoint(cx, cy, rMin, angleEnd).join(',')}`,
    `A${rMin},${rMin} 0 ${largeArcFlag},0 ${arcPoint(cx, cy, rMin, angleStart).join(',')}`,
    `Z`
  ];
  return d.join(' ');
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const ani = new Animated.Value(0);
class CirProgress extends React.Component {
  constructor(props) {
    super(props);

    const { size = 400, gap = 15, percent = 35 } = props;

    const startAngle = 0;
    const endAngle = (percent / 100) * 360;
    const r = Math.round(size / 2);

    this.state = {
      r,
      path: ani.interpolate({
        inputRange: [0, 1],
        outputRange: [
          arc(r, r, r - 10, r, startAngle, startAngle),
          arc(r, r, r - 10, r, startAngle, endAngle)
        ],
      })
    };
  }

  componentDidMount() {
    Animated.timing(                  // 随时间变化而执行动画
      ani,            // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 3000
      }
    ).start();
  }

  render() {
    const {r} = this.state;
    return (
      <Svg
        style={{backgroundColor: '#fff'}}
        width="300"
        height="300"
        viewBox="0 0 400 400"
      >
      <Defs>
        <LinearGradient id="linear" x1="0" y1="0" x2="170" y2="0">
          <Stop offset="0"   stopColor="rgb(255,255,0)"/>
          <Stop offset="1" stopColor="red"/>
        </LinearGradient>
      </Defs>
        <G x={0} y={0} origin={`${r}, ${r}`}>
          <AnimatedPath // 对应弧形
            d={this.state.path}
             fill="url(#linear)"
          />
        </G>
      </Svg>
    );
  }
}

export default CirProgress;