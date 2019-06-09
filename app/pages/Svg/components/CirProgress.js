import React from 'react'
import Svg, {
  Path,
  Circle,
  Text,
  Polyline,
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
  const d = [
    `M${arcPoint(cx, cy, rMin, angleStart).join(',')}`,
    `L${arcPoint(cx, cy, rMax, angleStart).join(',')}`,
    `A${rMax},${rMax} 0 ${largeArcFlag},1 ${arcPoint(cx, cy, rMax, angleEnd).join(',')}`,
    `L${arcPoint(cx, cy, rMin, angleEnd)}`,
    `A${rMin},${rMin} 0 ${largeArcFlag},0 ${arcPoint(cx, cy, rMin, angleStart).join(',')}`,
    `Z`
  ];
  return {
    d: d.join(' ')
  }
};

/**
 * 获取弧形对应label坐标
 * @param cx
 * @param cy
 * @param rMax
 * @param angleStart
 * @param angleEnd
 * @returns {*[]}
 */
const getLabelPosition = (cx, cy, rMax, angleStart, angleEnd) => {
  return [
    arcPoint(cx, cy, rMax + 10, (angleEnd + angleStart) / 2),
    arcPoint(cx, cy, rMax + 20, (angleEnd + angleStart) / 2),
  ]
};

const CirProgress = (props) => {
  const { size = 400, gap = 15, percent = 60 } = props;

  const startAngle = 0;
  const endAngle = (percent / 100) * 360;
  const r = Math.round(size / 2);

  return (
    <Svg
      style={{backgroundColor: '#fff'}}
      width="300"
      height="300"
      viewBox="0 0 400 400"
    >
      <G x={0} y={0} origin={`${r}, ${r}`}>
        <Path // 对应弧形
          {...arc(r, r, r - 10, r, startAngle, endAngle)}
          fill={'#1890ff'}
        />
      </G>
    </Svg>
  );
};

export default CirProgress;