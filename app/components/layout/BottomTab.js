import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class BottomBar extends React.Component {

  static defaultProps = {
    key: 'FUNC' // 默认选中
  };

  state = {
    tabs: [
      { title: '功能', icon: 'briefcase', key: 'FUNC'},
      { title: '我的', icon: 'user', key: 'MINE'},
    ]
  };

  componentDidMount() {

  }

  switchTab = tab => {

  };

  render() {
    const { tabs } = this.state;
    const { key } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map(tab => (
            <TouchableHighlight
              key={tab.key}
              style={styles.tabItem}
              underlayColor="#f5f5f5"
              onPress={() => this.switchTab(tab)}>
                <View>
                  <Icon name={tab.icon} style={[styles.icon, tab.key === key && styles.active]} />
                  <Text style={[styles.desc, tab.key === key && styles.active]}>{tab.title}</Text>
                </View>
            </TouchableHighlight>
          ))
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