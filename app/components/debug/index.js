import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import dragable from 'MYRN/app/components/hoc/Dragable'

@dragable({ size: 40, initPos: { x: 0, y: 400 } })
class DebugTool extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  openDebug = () => {
    console.log('test');
  }

  render () {
    const { focus } = this.props;
    return (
      <View style={{...styles.trigger, ...{opacity: focus? 0.6: 0.3 }}}>
        <Icon
          name="setting"
          style={{fontSize: 30, color: '#fff'}} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  trigger: {
    width: '100%', height: '100%',
    borderRadius: 10,
    backgroundColor: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }
});

export default DebugTool;
