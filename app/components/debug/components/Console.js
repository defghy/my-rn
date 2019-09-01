import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

class Console extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  clearConsole = () => {
    this.setState({
      messages: []
    });
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.controlPanel}>
          <TouchableHighlight
            onPress={this.clearConsole}
            style={styles.clear}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Icon name="delete" style={styles.clearIcon} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '100%'
  },
  controlPanel: {
    height: '40rem',
    paddingHorizontal: '10rem',
    flexDirection: 'row', alignItems: 'center',
    borderColor: '#eceffe', borderBottomWidth: 1
  },
  clear: {
    width: '40rem', height: '100%',
    alignItems: 'center', justifyContent: 'center'
  },
  clearIcon: {
    fontSize: '24rem', color: '#707d8b', height: '24rem'
  }
});

export default Console;
