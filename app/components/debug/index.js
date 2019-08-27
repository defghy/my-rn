import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withNavigation } from 'react-navigation';
import {
  View, Text, TouchableHighlight, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

@withNavigation
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

  render () {
    return (
      <View style={styles.trigger}>

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  trigger: {
    position: 'relative', width: '100%',
    backgroundColor: '#f5f5f5', color: '#333',
    height: '44rem',
    fontSize: '18rem',
    overflow: 'hidden',
    flexShrink: 0, flexDirection: 'row'
  }
});

export default DebugTool;
