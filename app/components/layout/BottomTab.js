import React from 'react';
import { withNavigation } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

@withNavigation
class BottomBar extends React.Component {

  static defaultProps = {
    page: 'FUNC' // 默认选中
  };

  state = {
    tabs: [
      { title: '功能', icon: 'briefcase', key: 'FUNC', route: '/base/home' },
      { title: '我的', icon: 'user', key: 'MINE', route: '/base/mine' },
    ]
  };

  componentDidMount() {

  }

  switchTab = tab => {
    const { navigation } = this.props;
    navigation.replace(tab.route);
  };

  render() {
    const { tabs } = this.state;
    const { page } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map(tab => {
            const isActive = tab.key === page;
            return (
              <TouchableHighlight
                key={tab.key}
                style={styles.tabItem}
                underlayColor="#f5f5f5"
                onPress={() => this.switchTab(tab)}>
                  <View>
                    <Icon name={tab.icon} style={[styles.icon, isActive && styles.active]} />
                    <Text style={[styles.desc, isActive && styles.active]}>{tab.title}</Text>
                  </View>
              </TouchableHighlight>
            );
          })
        }
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '49rem',
    backgroundColor: '#fff'
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  icon: {
    fontSize: '22rem', color: '#333',
    marginBottom: 3
  },
  desc: {
    fontSize: '10rem', color: '#333'
  },
  active: {
    color: '#3072F6'
  }
});

export default BottomBar;