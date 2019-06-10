import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

export const routers = {
  '/base/home': require('./pages/dashboard/Home/Home').default,
  '/base/mine': require('./pages/dashboard/Mine/Mine').default,
  '/webview/index': { title: 'webview', screen: require('./pages/RnWebview/Webview').default },
  '/svg/index': { title: 'svg测试', screen: require('./pages/Svg/Svg').default },
  '/ajax/index': { title: 'Ajax测试', screen: require('./pages/Ajax/Ajax').default },
};

const stackRouter = createStackNavigator(routers, {
  initialRouteName: '/base/home',
  headerMode: 'none',
});

export default createBottomTabNavigator({
  'Home': stackRouter,
  'Mine': stackRouter
}, {
  tabBarComponent: () => null,
});

// 监听路由
export const onRouteChange = function(prevState, currentState, action) {
  let route = routers[action.routeName];
  if (route) {
    const { title } = route;
    global.currRoute = { title };
  }
};