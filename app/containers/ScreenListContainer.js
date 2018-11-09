import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers } from '../theme/global-styles';

export class ScreenList extends Component {
  state = { selected: {} };

  _keyExtractor = item => item.id;

  _onPressItem = id => {
    this.setState({ selected: { ...this.state.selected, [id]: !this.state.selected[id] } });
  };

  _renderItem = ({ item }) => (
    <TouchableHighlight onPress={this._onPressItem.bind(this, item.id)}>
      <Text style={this.state.selected[item.id] ? s.red : s.black}>{item.id}</Text>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={[containers.containerMain]}>
        <Text>Sample List</Text>
        <FlatList data={this.props.data} keyExtractor={this._keyExtractor} renderItem={this._renderItem} />
      </View>
    );
  }
}

ScreenList.propTypes = {
  data: PropTypes.object
};

ScreenList.defaultProps = {
  data: [{ id: 1 }, { id: 2 }]
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
