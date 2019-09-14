import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import dragable from 'MYRN/app/components/hoc/Dragable';
import DebugInfo from './Debugger';

@dragable({
  size: 40,
  initPos: { x: 0, y: 400 },
  callbacks: {
    onClick: 'openDebug'
  }
})
class DebugTool extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      showDebug: false
    };
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  openDebug = () => {
    this.setState({
      showDebug: true
    });
  };

  closeDebug = () => {
    this.setState({
      showDebug: false
    });
  };

  render () {
    const { focus } = this.props;
    const { showDebug } = this.state;

    if (!global.USE_DEBUG) {
      return null;
    }

    return (
      <View style={{...styles.trigger, ...{opacity: focus? 0.6: 0.3 }}}>
        <Icon
          name="setting"
          style={{fontSize: 40, color: '#fff'}} />
        <Modal
          visible={showDebug}
          animationType="fade"
          transparent={true}
          onRequestClose={this.closeDebug}
        >
          <DebugInfo close={this.closeDebug} />
        </Modal>
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
