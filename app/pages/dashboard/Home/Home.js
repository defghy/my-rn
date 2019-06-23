import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, FlatList, SectionList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Accordion, List } from '@ant-design/react-native';

import Page from 'MYRN/app/components/layout/Page';
import BottomTab from 'MYRN/app/components/layout/BottomTab';

import Icon from 'react-native-vector-icons/dist/AntDesign';

@withNavigation
class Home extends Component {

  constructor(props) {
    super(props);

    const tools = [
      { title: 'Webview', route: '/webview/index', params: {
        url: 'https://crm-mobile.stage.yunshanmeicai.com/groupLeaderSplit/mine'
      }},
      { title: 'Svg测试', route: '/svg/index'},
      { title: 'Ajax测试', route: '/ajax/index'},
      { title: 'Camera测试',
        data: [
          { title: '拍照', route: '/camera/index'},
          { title: '扫码', route: '/camera/index'},
        ]
      }
    ];
    tools.forEach(tool => {
      tool.data = tool.data || [];
      tool.collapse = true;
    });

    this.state = {
      tools
    };
  }

  componentWillMount() {

  }

  renderItem = ({item, lvl}) => {
    const { navigation } = this.props;
    return (
      <TouchableHighlight
        onPress={() => {
          if (item.route) {
            return navigation.push(item.route, item.params);
          }
          else {
            item.collapse = !item.collapse;
            this.setState({
              tools: [...this.state.tools]
            });
          }
        }}
        underlayColor="#efefef">
        <View style={[styles.listItem, styles[`lvl${lvl}`]]}>
          <Text style={styles[`listItemTitle${lvl}`]}>{item.title}</Text>
          <Icon
            name={item.route? 'right': item.collapse? 'down': 'up'}
            style={styles[`listItemIcon${lvl}`]} />
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { tools } = this.state;
    return (
      <Page>
        <View style={styles.body}>
          <SectionList
            renderSectionHeader={({ section }) => this.renderItem({item: section, lvl: 1})}
            renderItem={({item, index, section}) => {
              if (!section.route && section.collapse) {
                return null;
              }
              return this.renderItem({item, lvl: 2});
            }}
            sections={tools}
            keyExtractor={(item, index) => item.title}
            extraData={this.state}
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
  lvl2: {
    fontSize: '14rem',
    backgroundColor: '#fcfcfc',
    borderBottomColor: '#eee',
  },
  listItemTitle1: {
    flex: 1,
    fontSize: '16rem', color: '#333', fontWeight: 'bold',
  },
  listItemTitle2: {
    flex: 1,
    fontSize: '14rem', color: '#333', fontWeight: 'normal',
  },
  listItemIcon1: {
    fontSize: '20rem', fontWeight: '300',
    color: '#666'
  },
  listItemIcon2: {
    fontSize: '14rem', fontWeight: '300',
    color: '#666'
  }
});

export default Home;