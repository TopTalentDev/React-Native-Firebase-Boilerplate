import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import actionCreators from '../redux/actions';
import { AppNavigator } from '../navigators';
import { SCREEN_STACK_HOME, SCREEN_STACK_AUTH } from '../navigators/screenNames';

export interface Props {
  data?: any[],
  navigation?: any,
  auth?: any
}

export interface State {
  auth: any
}

export class ScreenMain extends Component<Props, State> {
  _navigator: any;

  componentDidUpdate(prevProps: Props) {
    if (this.props.auth.user && !prevProps.auth.user) {
      this._navigator.dispatch(NavigationActions.navigate({ routeName: SCREEN_STACK_HOME }));
    } else if (!this.props.auth.user && prevProps.auth.user) {
      this._navigator.dispatch(NavigationActions.navigate({ routeName: SCREEN_STACK_AUTH }));
    }
  }
  render() {
    return <AppNavigator ref={(ref: any) => (this._navigator = ref)} />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export const ScreenMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMain);
