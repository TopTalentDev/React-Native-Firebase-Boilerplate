import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
// @ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';

interface Props {
  me?: any
  isInitialized?: boolean
}

export class ScreenProfile extends Component<Props> {
  render() {
    return (
      <View style={containers.containerMain}>
        <View style={flexbox.columnCentered}>
          <Text style={s.f3}>Profile Details</Text>
          <Text>{this.props.me.profile.name}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export const ScreenProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenProfile);
