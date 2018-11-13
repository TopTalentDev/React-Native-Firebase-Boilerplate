import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import actionCreators from '../redux/actions';
import { AppNavigator } from '../navigators';
import { SCREEN_STACK_HOME, SCREEN_LOGIN } from '../navigators/screenNames';

export class ScreenMain extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.user && !prevProps.auth.user) {
      this._navigator.dispatch(NavigationActions.navigate({ routeName: SCREEN_STACK_HOME }));
    } else if (!this.props.auth.user && prevProps.auth.user) {
      this._navigator.dispatch(NavigationActions.navigate({ routeName: SCREEN_LOGIN }));
    }
  }
  render() {
    return <AppNavigator ref={ref => (this._navigator = ref)} />;
  }
}

ScreenMain.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMain);
