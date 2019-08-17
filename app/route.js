import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

export const routers = {
  '/base/home': require('./pages/dashboard/Home/Home').default,
  '/base/mine': require('./pages/dashboard/Mine/Mine').default,
  '/webview/index': { title: 'webview', screen: require('./pages/RnWebview/Webview').default },
  '/svg/index': { title: 'svg测试', screen: require('./pages/Svg/Svg').default },
  '/ajax/index': { title: 'Ajax测试', screen: require('./pages/Ajax/Ajax').default },
  '/camera/index': { title: 'Camera测试', screen: require('./pages/Camera/Camera').default },
  '/snapshot/index': { title: 'SnapShot测试', screen: require('./pages/SnapShot/index').default },
  '/map/baidu': { title: '百度地图测试', screen: require('./pages/GeoMap/BaiduMap').default },
  '/gesture/drag': { title: '拖拽测试', screen: require('./pages/Gesture/Drag').default },
  '/native/modules': { title: 'nativeModules测试', screen: require('./pages/Native/NativeModules').default },
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