import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';
import { SCREEN_PROFILE, SCREEN_SETTINGS } from '../navigators/screenNames';

export class ScreenList extends Component {
  state = { selected: {} };

  _keyExtractor = item => item.id;

  _onPressItem = id => {
    this.setState({ selected: { ...this.state.selected, [id]: !this.state.selected[id] } });
  };

  _onGoToProfilePress = () => {
    this.props.navigation.navigate(SCREEN_PROFILE);
  };

  _onGoToSettingsPress = () => {
    this.props.navigation.navigate(SCREEN_SETTINGS);
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={this._onPressItem.bind(this, item.id)}>
      <Text style={this.state.selected[item.id] ? s.red : s.black}>{item.id}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={[containers.containerMain]}>
        <View style={[s.flx_i, flexbox.columnTopCentered]}>
          <TouchableOpacity onPress={this._onGoToProfilePress}>
            <Text>Go to profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onGoToSettingsPress}>
            <Text>Go to settings</Text>
          </TouchableOpacity>
          <FlatList data={this.props.data} keyExtractor={this._keyExtractor} renderItem={this._renderItem} />
        </View>
      </View>
    );
  }
}

ScreenList.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object
};

ScreenList.defaultProps = {
  data: []
};

const mapStateToProps = state => {
  return {
    data: [{ id: 1 }, { id: 2 }]
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenList);
