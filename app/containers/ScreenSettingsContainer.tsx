import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//@ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';

interface Props {
  app: any
};

export class ScreenSettings extends Component<Props> {
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

const mapStateToProps = (state: any) => ({
  app: state.app
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export const ScreenSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSettings);
