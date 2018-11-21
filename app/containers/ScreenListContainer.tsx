import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';
import { SCREEN_PROFILE, SCREEN_SETTINGS } from '../navigators/screenNames';
import firebase from 'react-native-firebase';

interface Props {
  data: any[];
  navigation?: any;
}

interface State {
  selected: any;
}

// @ts-ignore
const Banner = firebase.admob.Banner;
// @ts-ignore
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

export class ScreenList extends Component<Props, State> {
  state: State = { selected: {} };

  static defaultProps: Props = {
    data: []
  };

  _keyExtractor = item => item.id;

  _onPressItem = (id: string) => {
    this.setState({ selected: { ...this.state.selected, [id]: !this.state.selected[id] } });
  };

  _onGoToProfilePress = () => {
    this.props.navigation.navigate(SCREEN_PROFILE);
  };

  _onGoToSettingsPress = () => {
    this.props.navigation.navigate(SCREEN_SETTINGS);
  };

  _renderItem = ({ item }: { item: any }) => (
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
          <Banner unitId="ca-app-pub-3940256099942544/6300978111" request={request.build()} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: [{ id: '1' }, { id: '2' }]
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export const ScreenListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenList);
