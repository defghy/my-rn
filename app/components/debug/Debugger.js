import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View, Text, TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import Console from './components/Console';
import Network from './components/Network';

class DebugTool extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'CONSOLE'
    };
  }

  modules = [
    { key: 'CONSOLE', name: 'Console', comp: Console },
    { key: 'NETWORK', name: 'Network', comp: Network },
  ];

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  changeTab = item => {
    this.setState({
      activeTab: item.key
    });
  };

  _renderTab (item) {
    const { activeTab } = this.state;
    const isActive = activeTab === item.key;
    return (
      <View key={item.key}>
        <TouchableHighlight
          style={{
            ...tabStyles.item,
            ...(isActive? tabStyles.active: {}),
          }}
          onPress={() => this.changeTab(item)}
          underlayColor="transparent"
          activeOpacity={0.7}
        >
          <Text
            style={{
              ...tabStyles.text,
              ...(isActive ? tabStyles.textActive : {}),
            }}
          >{item.name}</Text>
        </TouchableHighlight>
        { isActive && <View style={tabStyles.bottomBar}></View> }
      </View>
    );
  }

  render () {
    const { activeTab } = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.topBanner}>
          <ScrollView
            horizontal
            style={styles.topBannerScroll}
          >
            {this.modules.map(item => this._renderTab(item))}
          </ScrollView>
          <TouchableHighlight
            onPress={this.props.close}
            style={styles.closeBtn}
            underlayColor="transparent"
            activeOpacity={0.7}
          >
            <Icon name="closecircleo" style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
        {this.modules.map(item => {
          const Comp = item.comp;
          return (
            <View key={item.key} style={{
              ...styles.body,
              ...(activeTab === item.key ? {} : styles.hide)
            }}>
              <Comp />
            </View>
          );
        })}
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
    borderColor: '#999', borderBottomWidth: 1
  },
  topBannerScroll: {
    height: '100%',
    flex: 1,
  },
  closeBtn: {
    width: '40rem', height: '100%',
    alignItems: 'center', justifyContent: 'center',
  },
  closeIcon: {
    fontSize: '24rem', color: '#fff', height: '24rem'
  },
  hide: {
    display: 'none'
  },
  body: {
    flex: 1
  }
});

const tabStyles = EStyleSheet.create({
  item: {
    height: '100%',
    paddingHorizontal: '10rem',
    flexDirection: 'row', alignItems: 'center',
    position: 'relative'
  },
  active: {
    backgroundColor: '#eceffe',
    opacity: 0.5,
    borderColor: '#fff', borderBottomWidth: '2rem',
  },
  text: {
    color: '#fff', fontSize: '14rem', fontWeight: 'bold'
  },
  textActive: {
    color: '#263238',
  },
  bottomBar: {
    width: '100%', height: '3rem',
    position: 'absolute', bottom: 0, left: 0,
    backgroundColor: '#fff'
  }
});

export default DebugTool;
