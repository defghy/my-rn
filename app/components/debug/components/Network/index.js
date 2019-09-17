import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
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
    const { reqs } = this.state;
    reqs.splice(0, reqs.length);
    this.setState({
      reqs: [...reqs]
    });
  }

  openItem = item => {

  }

  _renderItem(item) {
    const { rnRequest } = item;
    const { urlObj } = rnRequest;
    return (
      <TouchableHighlight
        key={rnRequest.uid}
        onPress={() => this.openItem(item)}
        underlayColor="#f5f5f9"
      >
        <View style={netStyles.wrapper}>
          <View style={netStyles.pathname}>
            <Text numberOfLines={5}
              style={{
                ...netStyles.textCommon
              }}>{urlObj.lastPath || urlObj.domain}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
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
          { reqs.map(item => this._renderItem(item)) }
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%', height: '100%'
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

const netStyles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center'
  },
  textCommon: {
    fontSize: 12
  },
  pathname: {
    width: 150,
  }
});

export default Network;
