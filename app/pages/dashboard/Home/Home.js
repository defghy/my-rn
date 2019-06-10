import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Page from 'MYRN/app/components/layout/Page';
import BottomTab from 'MYRN/app/components/layout/BottomTab';

import Icon from 'react-native-vector-icons/dist/AntDesign';

@withNavigation
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tools: [
        { title: 'Webview', route: '/webview/index', params: {
          url: 'https://crm-mobile.stage.yunshanmeicai.com/groupLeaderSplit/mine'
        }},
        { title: 'Svg测试', route: '/svg/index'},
        { title: 'Ajax测试', route: '/ajax/index'},
      ]
    };
  }

  renderItem = ({item, index}) => {
    const { navigation } = this.props;
    return (
      <TouchableHighlight
        onPress={() => navigation.push(item.route, item.params)}
        underlayColor="#efefef">
        <View style={styles.listItem}>
          <Text style={styles.listItemTitle}>{item.title}</Text>
          <Icon name="right" style={styles.listItemIcon} />
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { tools } = this.state;
    return (
      <Page>
        <View style={styles.body}>
          <FlatList
            data={tools}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.title}
            refreshing={false}
          />
        </View>
        <BottomTab page="FUNC" />
      </Page>
    );
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    paddingTop: '10rem'
  },
  listItem: {
    borderBottomColor: '#979797', borderBottomWidth: EStyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    flexDirection: 'row', alignItems: 'center', height: '44rem',
    paddingHorizontal: '20rem'
  },
  listItemTitle: {
    flex: 1,
    fontSize: '16rem', color: '#333', fontWeight: 'bold',
  },
  listItemIcon: {
    fontSize: '20rem', fontWeight: '300',
    color: '#666'
  }
});

export default Home;