import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

const router = createStackNavigator({
  'base/home': require('./pages/dashboard/home').default,
  'base/mine': require('./pages/dashboard/home').default,
}, {
  initialRouteName: 'base/home',
  headerMode: 'none',
});

export default router;