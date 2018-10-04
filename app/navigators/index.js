import { StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import colors from '../theme/colors';
import { SCREEN_PROFILE, SCREEN_SETTINGS } from './screenNames';

export const AppDrawerNavigator = DrawerNavigator(
  {
    [SCREEN_CONNECT]: {
      screen: props => <MainConnect appNavigation={props.navigation} />
    },
    [SCREEN_CORPORATE_DIRECTORY]: {
      screen: props => <MainDirectory appNavigation={props.navigation} />
    },
    [SCREEN_SETTINGS]: { screen: SettingsContainer }
  },
  {
    contentComponent: AppDrawerContainer,
    drawerWidth: 280
  }
);

export const DirectoryNavigator = TabNavigator(
  {
    [SCREEN_PROFILE]: {
      screen: props => <PeopleTab screenProps={{ ...props.screenProps, tabNavigation: props.navigation }} />,
      navigationOptions: {
        tabBarLabel: 'People',
        tabBarIcon: ({ tintColor }) => (
          <Image source={{ uri: 'peopleicon' }} style={[{ width: 28, height: 25 }, { tintColor: tintColor }]} /> // eslint-disable-line
        )
      }
    },
    [SCREEN_DEPARTMENTS]: {
      screen: props => <DepartmentsTab screenProps={{ ...props.screenProps, tabNavigation: props.navigation }} />,
      navigationOptions: {
        tabBarLabel: 'Departments',
        tabBarIcon: ({ tintColor }) => (
          <Image source={{ uri: 'departmenticon' }} style={[{ width: 28, height: 28 }, { tintColor: tintColor }]} /> // eslint-disable-line
        )
      }
    },
    [SCREEN_TERRITORIES]: {
      screen: props => <TerritoriesTab screenProps={{ ...props.screenProps, tabNavigation: props.navigation }} />,
      navigationOptions: {
        tabBarLabel: 'Territories',
        tabBarIcon: ({ tintColor }) => (
          <Image source={{ uri: 'icon-name' }} style={[{ width: 28, height: 28 }, { tintColor: tintColor }]} />
        )
      }
    }
  },
  {
    initialRouteName: SCREEN_PEOPLE,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: colors.BLUE,
      inactiveTintColor: colors.GRAY,
      style: {
        backgroundColor: colors.GRAY2
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

export const AppNavigator = StackNavigator(
  {
    AppDrawerNavigator: { screen: AppDrawerNavigator }
  },
  {
    headerMode: 'none'
  }
);
