import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import webviewTest from './webview.js';
import Test from './test.js';
import Detail from './detail.js';
import jokeList from './jokeList.js';

const Tab = TabNavigator(
  {
    Home: {screen: webviewTest},
    test: {screen: Test},
    joke: {screen: jokeList}
  },
  {
    lazy: true,
    initialRouteName: 'test',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff',
        "borderTopColor": '#ddd',
        "borderTopWidth": 1
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      },
      labelStyle: {
        fontSize: 20
      },
      iconStyle: {
        height: 0
      }
    }
  }
);

const homeStack = StackNavigator({
  home: {screen: webviewTest},
  detail: {screen: Detail}
}, {
  initialRouteName: 'home'
});

const testStack = StackNavigator({
  test: {screen: Test},
  detail: {screen: Detail}
}, {
  initialRouteName: 'test'
});

const TopNav = StackNavigator({
  Tab: {screen: Tab},
  detail: {screen: Detail}
}, {
  initialRouteName: 'Tab'
});

export default class App extends React.Component {
  render() {
    return (
      <TopNav />
    );
  }
};