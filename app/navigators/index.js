import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  NavigationActions
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { styles as s } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Ionicons';
import { SCREEN_PROFILE, SCREEN_SETTINGS, SCREEN_LIST, SCREEN_LOGIN } from './screenNames';
import { ScreenProfileContainer } from '../containers/ScreenProfileContainer';
import { ScreenSettingsContainer } from '../containers/ScreenSettingsContainer';
import { DrawerMainMenuContainer } from '../containers/DrawerMainMenuContainer';
import { ScreenListContainer } from '../containers/ScreenListContainer';
import { ScreenLoginContainer } from '../containers/ScreenLoginContainer';
import colors from '../theme/colors';

const renderMenuButton = (focused, tintColor, navigation) => {
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Icon style={s.ml2} name="ios-menu" size={30} color={tintColor} />
    </TouchableHighlight>
  );
};

const renderBackButton = (focused, tintColor, navigation) => {
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(NavigationActions.back())}>
      <Text style={[{ color: tintColor }, s.ml2]}>Back</Text>
    </TouchableHighlight>
  );
};

export const TheTabNavigator = createBottomTabNavigator(
  {
    [SCREEN_PROFILE]: {
      screen: ScreenProfileContainer,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="people" size={30} color={tintColor} /> // eslint-disable-line
      }
    },
    [SCREEN_SETTINGS]: {
      screen: ScreenSettingsContainer,
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

// Screens that share the same header bar
export const MainStackNavigator = createStackNavigator(
  {
    [SCREEN_LIST]: {
      screen: ScreenListContainer,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
        };
      }
    },
    [SCREEN_PROFILE]: {
      screen: ScreenProfileContainer
    },
    [SCREEN_SETTINGS]: {
      screen: ScreenSettingsContainer
    }
  },
  {
    initialRouteName: SCREEN_LIST,
    headerMode: 'float'
  }
);

export const ScreenProfileNavigator = createStackNavigator({
  [SCREEN_PROFILE]: {
    screen: ScreenProfileContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const ScreenSettingsNavigator = createStackNavigator({
  [SCREEN_SETTINGS]: {
    screen: ScreenSettingsContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Profile: {
      screen: ScreenProfileNavigator
    },
    Settings: {
      screen: ScreenSettingsNavigator
    },
    List: {
      screen: MainStackNavigator
    }
  },
  {
    contentComponent: DrawerMainMenuContainer,
    drawerWidth: 280,
    initialRouteName: 'List',
    contentOptions: {
      inactiveTintColor: colors.white,
      activeTintColor: colors.blue
    }
  }
);

export const HomeStack = createStackNavigator({
  Drawer: {
    screen: AppDrawerNavigator,
    navigationOptions: { header: null }
  }
});

export const AppNavigator = createSwitchNavigator(
  {
    [SCREEN_LOGIN]: {
      screen: ScreenLoginContainer,
      navigationOptions: { header: null }
    },
    HomeStack: {
      screen: HomeStack,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'HomeStack'
  }
);
