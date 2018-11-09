import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';

export class ScreenSettings extends Component {
  render() {
    return (
      <View style={containers.containerMain}>
        <View style={flexbox.columnCentered}>
          <Text style={s.f3}>Settings</Text>
        </View>
      </View>
    );
  }
}

ScreenSettings.propTypes = {
  app: PropTypes.object
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSettings);
