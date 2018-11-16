import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  NavigationActions,
  NavigationContainer
} from 'react-navigation';
//@ts-ignore
import { DrawerActions } from 'react-navigation-drawer';
//@ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SCREEN_PROFILE,
  SCREEN_SETTINGS,
  SCREEN_LIST,
  SCREEN_LOGIN,
  SCREEN_STACK_HOME,
  SCREEN_TABBED1,
  SCREEN_TABBED_MAIN,
  SCREEN_TABBED2,
  SCREEN_STACK_AUTH,
  SCREEN_REGISTER
} from './screenNames';
import { ScreenProfileContainer } from '../containers/ScreenProfileContainer';
import { ScreenSettingsContainer } from '../containers/ScreenSettingsContainer';
import { DrawerMainMenuContainer } from '../containers/DrawerMainMenuContainer';
import { ScreenListContainer } from '../containers/ScreenListContainer';
import { ScreenLoginContainer } from '../containers/ScreenLoginContainer';
import colors from '../theme/colors';
import { ScreenTabbed1Container } from '../containers/ScreenTabbed1Container';
import { ScreenTabbed2Container } from '../containers/ScreenTabbed2Container';
import { ScreenRegisterContainer } from '../containers/ScreenRegisterContainer';

const renderMenuButton = (focused: boolean, tintColor: string, navigation: any) => {
  //
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Icon style={s.ml2} name="ios-menu" size={30} color={tintColor} />
    </TouchableHighlight>
  );
};

const renderBackButton = (focused: boolean, tintColor: string, navigation: any) => {
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(NavigationActions.back())}>
      <Text style={[{ color: tintColor }, s.ml2]}>Back</Text>
    </TouchableHighlight>
  );
};

export const BottomTabNavigator: NavigationContainer = createBottomTabNavigator(
  {
    [SCREEN_TABBED1]: ScreenTabbed1Container,
    [SCREEN_TABBED2]: ScreenTabbed2Container
  },
  {
    navigationOptions: ({ navigation }: { navigation: any }) => ({
      tabBarIcon: ({
        focused,
        horizontal,
        tintColor
      }: {
        focused: boolean;
        horizontal: boolean;
        tintColor: string;
      }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === SCREEN_TABBED1) {
          iconName = `ios-people`;
        } else if (routeName === SCREEN_TABBED2) {
          iconName = `md-microphone`;
        }
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: colors.midGray,
      showLabel: false
    }
  }
);

// Screens that share the same header bar
export const MainStackNavigator: NavigationContainer = createStackNavigator(
  {
    [SCREEN_LIST]: {
      screen: ScreenListContainer,
      navigationOptions: ({ navigation }: { navigation: any }) => {
        return {
          headerLeft: ({ focused, tintColor }: { focused: boolean; tintColor: string }) =>
            renderMenuButton(focused, tintColor, navigation)
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

export const ScreenProfileNavigator: NavigationContainer = createStackNavigator({
  [SCREEN_PROFILE]: {
    screen: ScreenProfileContainer,
    navigationOptions: ({ navigation }: { navigation: any }) => {
      return {
        headerLeft: ({ focused, tintColor }: { focused: boolean; tintColor: string }) =>
          renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const ScreenSettingsNavigator: NavigationContainer = createStackNavigator({
  [SCREEN_SETTINGS]: {
    screen: ScreenSettingsContainer,
    navigationOptions: ({ navigation }: { navigation: any }) => {
      return {
        headerLeft: ({ focused, tintColor }: { focused: boolean; tintColor: string }) =>
          renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const ScreenTabbedNavigator: NavigationContainer = createStackNavigator({
  [SCREEN_TABBED_MAIN]: {
    screen: BottomTabNavigator,
    navigationOptions: ({ navigation }: { navigation: any }) => {
      return {
        headerLeft: ({ focused, tintColor }: { focused: boolean; tintColor: string }) =>
          renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const AppDrawerNavigator: NavigationContainer = createDrawerNavigator(
  {
    Profile: {
      screen: ScreenProfileNavigator
    },
    Settings: {
      screen: ScreenSettingsNavigator
    },
    List: {
      screen: MainStackNavigator
    },
    Tabbed: {
      screen: ScreenTabbedNavigator
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

export const HomeStack: NavigationContainer = createStackNavigator({
  Drawer: {
    screen: AppDrawerNavigator,
    navigationOptions: { header: null }
  }
});

export const AuthStack: NavigationContainer = createStackNavigator({
  [SCREEN_LOGIN]: {
    screen: ScreenLoginContainer,
    navigationOptions: { header: null }
  },
  [SCREEN_REGISTER]: {
    screen: ScreenRegisterContainer
  }
});

export const AppNavigator: NavigationContainer = createSwitchNavigator(
  {
    [SCREEN_STACK_AUTH]: {
      screen: AuthStack,
      navigationOptions: { header: null }
    },
    [SCREEN_STACK_HOME]: {
      screen: HomeStack,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: SCREEN_STACK_AUTH
  }
);
