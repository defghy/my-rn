import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import webviewTest from './webview.js';
import Test from './test.js';
import Detail from './detail.js';
import jokeList from './jokeList.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import route from './route';

// const Tab = createBottomTabNavigator(
//   {
//     Home: {screen: webviewTest},
//     test: {screen: Test},
//     joke: {screen: jokeList}
//   },
//   {
//     lazy: true,
//     initialRouteName: 'test',
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       activeTintColor: '#3e9ce9',
//       inactiveTintColor: '#999999',
//       showIcon: true,
//       style: {
//         backgroundColor: '#fff',
//         "borderTopColor": '#ddd',
//         "borderTopWidth": 1
//       },
//       indicatorStyle: {
//         opacity: 0
//       },
//       tabStyle: {
//         padding: 0
//       },
//       labelStyle: {
//         fontSize: 20
//       },
//       iconStyle: {
//         height: 0
//       }
//     },
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         // const { routeName } = navigation.state;
//         // let IconComponent = Ionicons;
//         // let iconName;
//         // if (routeName === 'Home') {
//         //   iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//         //   // Sometimes we want to add badges to some icons.
//         //   // You can check the implementation below.
//         //   IconComponent = HomeIconWithBadge;
//         // } else if (routeName === 'Settings') {
//         //   iconName = `ios-options`;
//         // }

//         // You can return any component that you like here!
//         return <Icon name="rocket" size={30} color="#900" />;
//       },
//     }),
//   }
// );

// const TopNav = createStackNavigator({
//   Tab: {screen: Tab},
//   detail: {screen: Detail}
// }, {
//   initialRouteName: 'Tab'
// });

export default createAppContainer(route);