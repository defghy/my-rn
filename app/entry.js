import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from "mobx-react";

import 'MYRN/app/utils/css/config';
import route, { onRouteChange } from './route';
import { setGlobalNavigator } from 'MYRN/app/utils/route';
import store from './store';

import Popup from 'MYRN/app/components/modal/Popup';

const AppContainer = createAppContainer(route);

export default class App extends React.Component {
  render() {
    return (
      <Provider {...store} >
        <View style={{flex: 1}}>
          <AppContainer
            ref={navigatorRef => setGlobalNavigator(navigatorRef)}
            onNavigationStateChange={onRouteChange}
          />
          <Popup />
        </View>
      </Provider>
    );
  }
}