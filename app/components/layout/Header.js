import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withNavigation } from 'react-navigation';
import {
  View, Text, TouchableHighlight, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { goBack, fetchCurrRoute } from 'MYRN/app/utils/route';

@withNavigation
class Header extends Component {

  static defaultProps = {
    left: null,  // 左侧组件
    leftAction: goBack, // 左侧行为
    title: '',   // 标题
    right: null   // 右侧组件
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {

  }

  componentWillUnmount() {

  }

  commonLeft() {
    const { leftAction, navigation } = this.props;
    return (
      <TouchableHighlight
        onPress={leftAction}
        underlayColor="#eee">
        <Icon name="left" style={styles.iconLeft} />
      </TouchableHighlight>
    );
  }

  render () {
    const { title, left, right, navigation } = this.props;
    const currRoute = fetchCurrRoute(navigation.state);
    return (
      <View style={styles.headnav}>
        <View style={styles.hleft} >
          {
            left? left: this.commonLeft()
          }
        </View>
        <View style={styles.tltctn} >
          <Text style={styles.title}>{title || currRoute && currRoute.title}</Text>
        </View>
        <View style={styles.hright}>
          {
            right? right: null
          }
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  headnav: {
    position: 'relative', width: '100%',
    backgroundColor: '#f5f5f5', color: '#333',
    height: '44rem',
    fontSize: '18rem',
    overflow: 'hidden',
    flexShrink: 0, flexDirection: 'row'
  },
  hleft: {
    width: '44rem', height: '100%',
    alignItems: 'center', flexDirection: 'row'
  },
  hright: {
    width: '44rem', height: '100%',
    alignItems: 'center', flexDirection: 'row'
  },
  tltctn: {
    alignItems: 'center', justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: '18rem', fontWeight: 'bold', color: '#333',
  },
  iconLeft: {
    fontSize: '18rem', fontWeight: 'bold',
    marginLeft: '14rem',
    color: '#333'
  }
});

export default Header;
