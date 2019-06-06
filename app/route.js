import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import webviewTest from './webview.js';
import Test from './test.js';
import Detail from './detail.js';
import jokeList from './jokeList.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const router = createStackNavigator({
  home: {
    screen: webviewTest
  }
}, {
    initialRouteName: 'home',
});

export default router;