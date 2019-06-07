import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

const router = createStackNavigator({
  '/base/home': require('./pages/dashboard/Home/Home').default,
  '/base/mine': require('./pages/dashboard/Mine/Mine').default,
}, {
  initialRouteName: '/base/home',
  headerMode: 'none',
});

export default router;