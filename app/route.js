import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

const router = createStackNavigator({
  '/base/home': require('./pages/dashboard/Home/Home').default,
  '/base/mine': require('./pages/dashboard/Mine/Mine').default,
  '/webview/index': require('./pages/RnWebview/Webview').default,
}, {
  initialRouteName: '/base/home',
  headerMode: 'none',
});

export default createBottomTabNavigator({
  'Home': router,
  'Mine': router
}, {
  tabBarComponent: () => null,
});