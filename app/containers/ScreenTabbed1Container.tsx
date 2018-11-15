import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//@ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, flexbox } from '../theme/global-styles';

interface Props {
  navigation: any
}

export class ScreenTabbed1 extends Component<Props> {
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

const mapStateToProps = (state: any) => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export const ScreenTabbed1Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenTabbed1);
