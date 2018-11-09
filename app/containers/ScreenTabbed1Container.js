import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';

export class ScreenTabbed1 extends Component {
  render() {
    return (
      <View style={[containers.containerMain]}>
        <View style={flexbox.columnCentered}>
          <Text style={[s.f3, s.mb5]}>Screen Tabbed 1</Text>
        </View>
      </View>
    );
  }
}

ScreenTabbed1.propTypes = {
  me: PropTypes.object,
  isInitialized: PropTypes.bool,
  navigation: PropTypes.object
};

const mapStateToProps = state => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenTabbed1Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenTabbed1);
