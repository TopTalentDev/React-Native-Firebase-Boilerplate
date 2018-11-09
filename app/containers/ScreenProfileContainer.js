import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers } from '../theme/global-styles';

export class ScreenProfile extends Component {
  render() {
    console.log(this.props.isInitialized);
    return (
      <View style={containers.containerMain}>
        <Text style={s.f3}>Profile Details</Text>
        <Text>{this.props.me.profile.name}</Text>
      </View>
    );
  }
}

ScreenProfile.propTypes = {
  me: PropTypes.object,
  isInitialized: PropTypes.bool
};

const mapStateToProps = state => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized
});

const mapDispatchToProps = dispatch => {
  console.log('MAP DISPATCH');
  return bindActionCreators(actionCreators, dispatch);
};

export const ScreenProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenProfile);
