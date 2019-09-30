import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import { setProxyData, reqs as cachedReqs } from './proxy';

import NetworkLine from './components/NetworkLine';
import NetworkDetail from './components/NetworkDetail';

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
      reqs: [...reqs],
    });
  }

  freshReq = () => {
    this.setState({
      reqs: [...this.state.reqs],
    });
  }

  clearReq = () => {
    const { reqs } = this.state;
    reqs.splice(0, reqs.length);
    this.setState({
      reqs: [...reqs]
    });
  }

  openItem = item => {
    if (this.detailRef) {
      this.detailRef.open({ detail: item })
    }
  }

  render () {
    const { reqs } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.panel}>
          <TouchableHighlight
            onPress={this.clearReq}
            style={styles.clear}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Icon name="delete" style={styles.clearIcon} />
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.body}>
          { reqs.map((item, index) => (
            <NetworkLine
              key={item.rnRequest.uid}
              item={item}
              index={index}
              openItem={this.openItem}
            />))
          }
        </ScrollView>
        <NetworkDetail ref={ref => (this.detailRef = ref)} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '100%', position: 'relative'
  },
  panel: {
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
  },
  body: {
    flex: 1
  }
});

export default Network;
