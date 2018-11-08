import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarTop,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SCREEN_PROFILE, SCREEN_SETTINGS, SCREEN_LIST } from './screenNames';
import { ScreenProfileContainer } from '../containers/ScreenProfileContainer';
import { ScreenSettingsContainer } from '../containers/ScreenSettingsContainer';
import { DrawerMainMenuContainer } from '../containers/DrawerMainMenuContainer';
import { ScreenListContainer } from '../containers/ScreenListContainer';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    [SCREEN_PROFILE]: {
      screen: props => <ScreenProfileContainer appNavigation={props.navigation} />
    },
    [SCREEN_SETTINGS]: { screen: ScreenSettingsContainer },
    [SCREEN_LIST]: { screen: ScreenListContainer }
  },
  {
    contentComponent: DrawerMainMenuContainer,
    drawerWidth: 280
  }
);

export const TheTabNavigator = TabNavigator(
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

export const AppNavigator = createStackNavigator({
  AppDrawerNavigator: {
    screen: AppDrawerNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => (
          <TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon style={{ marginLeft: 5 }} name="bars" size={30} color={tintColor} />
          </TouchableHighlight>
        ) // eslint-disable-line
      };
    }
  }
});
