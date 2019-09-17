import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';

import { setProxyData, reqs as cachedReqs } from './proxy'

class Network extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      reqs: cachedReqs
    };
  }

  componentDidMount () {
    setProxyData({ comp: this });
  }

  componentWillUnmount() {
    setProxyData({ comp: null });
  }

  addReq = (req) => {
    const { reqs } = this.state;
    reqs.push(req);
    this.setState({
      reqs: [...reqs]
    });
  }

  clearReq = () => {
    setProxyData({ reqs: [] })
    this.setState({
      reqs: []
    });
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <Text>Network</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '80%',
    position: 'absolute', bottom: 0,
    backgroundColor: '#fff', opacity: 0.9,
  },
  topBanner: {
    backgroundColor: 'rgb(33, 150, 243)',
    width: '100%', height: 30,
    flexDirection: 'row', alignItems: 'center',
  },
  topBannerScroll: {
    flex: 1,
  },
  closeBtn: {
    width: '40rem', height: '100%',
    alignItems: 'center', justifyContent: 'center',
  },
});

export default Network;
