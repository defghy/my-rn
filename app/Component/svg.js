import React from 'react';
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

class SvgTest extends React.Component {
  render() {
    return (
      <Svg
          width="50%"
          height="130"
          fill="#fff"
          stroke="#00f"
          color="#f00"
          viewBox="-16 -16 544 544"
      >
          <Path
              d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
              strokeWidth="32" stroke="#00f"
          />
          <Path d="M0,0L512,512" stroke="#0f0" strokeWidth="32" />
      </Svg>
    );
  }
}

export default SvgTest;