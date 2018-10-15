import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './DrawerMainMenuContainerStyles';
import Avatar from '../components/Avatar';
import actionCreators from '../redux/actions';
import { SCREEN_PROFILE, SCREEN_SETTINGS } from '../navigators/screenNames';
const items = [
  {
    id: 1,
    name: SCREEN_PROFILE,
    label: 'Profile'
  },
  {
    id: 2,
    name: SCREEN_SETTINGS,
    label: 'Settings'
  }
];

export class DrawerMainMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { items };
  }
  _renderHeader() {
    const { me } = this.props;

    return (
      <View style={styles.header}>
        {!_.isEmpty(me) && (
          <View style={styles.login}>
            <Avatar user={me} />
          </View>
        )}
        <TouchableOpacity style={styles.settingsButton} onPress={this._onSettingsPressed}>
          <Image source={{ uri: 'drawer-icon' }} />
        </TouchableOpacity>
      </View>
    );
  }
  _navigate(route) {
    this.props.navigation.navigate(route);
  }
  _onSettingsPressed = () => {
    this._navigate('Settings');
  };
  _onItemPressed = item => {
    this._navigate(item.name);
  };
  _renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };
  _keyExtractor = item => item.id;
  _renderList() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderList()}
      </View>
    );
  }
}

DrawerMainMenuContainer.propTypes = {
  navigation: PropTypes.object,
  me: PropTypes.object
};

const mapStateToProps = state => ({
  me: state.me
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMainMenuContainer);
