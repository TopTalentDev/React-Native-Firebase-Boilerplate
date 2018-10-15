import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREEN_PROFILE, SCREEN_SETTINGS } from './screenNames';
import { ScreenProfileContainer } from '../containers/ScreenProfileContainer';
import { ScreenSettingsContainer } from '../containers/ScreenSettingsContainer';
import { DrawerMainMenuContainer } from '../containers/DrawerMainMenuContainer';

export const AppDrawerNavigator = DrawerNavigator(
  {
    [SCREEN_PROFILE]: {
      screen: props => <ScreenProfileContainer appNavigation={props.navigation} />
    },
    [SCREEN_SETTINGS]: { screen: ScreenSettingsContainer }
  },
  {
    contentComponent: DrawerMainMenuContainer,
    drawerWidth: 280
  }
);

export const DirectoryNavigator = TabNavigator(
  {
    [SCREEN_PROFILE]: {
      screen: props => (
        <ScreenProfileContainer screenProps={{ ...props.screenProps, tabNavigation: props.navigation }} />
      ),
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="people" size={30} color={tintColor} /> // eslint-disable-line
      }
    },
    [SCREEN_SETTINGS]: {
      screen: props => (
        <ScreenSettingsContainer screenProps={{ ...props.screenProps, tabNavigation: props.navigation }} />
      ),
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => <Icon name="gear" size={30} color={tintColor} /> // eslint-disable-line
      }
    }
  },
  {
    initialRouteName: SCREEN_PROFILE,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      },
      iconStyle: {
        width: 30,
        height: 30
      },
      labelStyle: {
        fontSize: 11
      }
    }
  }
);

export const AppNavigator = StackNavigator({
  AppDrawerNavigator: { screen: AppDrawerNavigator }
});
