import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { styles as s } from 'react-native-style-tachyons';
import { elevations } from '../theme/global-styles';
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
      <View style={[s.f, s.flx_row, s.bg_darkGray, s.pa2]}>
        {!_.isEmpty(me) && (
          <View>
            <Avatar user={me} />
          </View>
        )}
        <TouchableOpacity onPress={this._onSettingsPressed}>
          <Icon name="cogs" size={20} style={s.white} />
        </TouchableOpacity>
      </View>
    );
  }
  _onSettingsPressed = () => {
    this.props.navigation.navigate(SCREEN_SETTINGS);
  };
  _onItemPressed = item => {
    this.props.navigation.navigate(item.name);
  };
  _renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this._onItemPressed(item)}>
          <Text style={s.white}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  _keyExtractor = item => item.id;
  _renderList() {
    return (
      <FlatList
        style={[s.bg_black, s.pa2]}
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
  render() {
    return (
      <View style={[elevations.e_10, s.f, s.flx_i, s.bg_black]}>
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
