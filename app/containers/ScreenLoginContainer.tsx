import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bindActionCreators, Dispatch, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import * as authActions from '../redux/actions/auth';
import * as appActions from '../redux/actions/app';
import * as admobActions from '../redux/actions/admob';
import { containers, layout, flexbox } from '../theme/global-styles';
import { SCREEN_REGISTER } from '../navigators/screenNames';
import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';

interface DispatchProps {
  requestAnonymousLogin: typeof authActions.requestAnonymousLogin;
  requestFacebookLogin: typeof authActions.requestFacebookLogin;
  requestLogin: typeof authActions.requestLogin;
  clearError: typeof appActions.clearError;
  showSampleInterstitial: typeof admobActions.showSampleInterstitial;
}

interface StoreProps {
  me: any;
  isInitialized: boolean;
  navigation: any;
  authError: string;
}

interface Props extends DispatchProps, StoreProps {
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

interface State {
  email: string | null;
  password: string | null;
}

export class ScreenLogin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { email: null, password: null };
  }
  _onEmailChange = (email: string) => {
    this.setState({ email });
  };
  _onPasswordChange = (password: string) => {
    this.setState({ password });
  };
  _onAnonymousLoginPress = () => {
    this.props.showSampleInterstitial();
    this.props.requestAnonymousLogin();
  };
  _onFacebookLoginPress = () => {
    this.props.requestFacebookLogin();
  };
  _onLoginPress = () => {
    this.props.clearError('authError');
    this.props.requestLogin(this.state.email!, this.state.password!);
  };
  _onRegisterPress = () => {
    this.props.navigation.navigate(SCREEN_REGISTER);
  };
  render() {
    return (
      <View style={[containers.containerMain]}>
        <View style={flexbox.columnCentered}>
          <Text style={[s.f3, s.mb5]}>Login to Account</Text>
          <TextInput style={[s.pa2, layout.w100]} placeholder="email" onChangeText={this._onEmailChange} />
          <TextInput
            style={[s.pa2, layout.w100]}
            placeholder="password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={this._onPasswordChange}
          />

          <TouchableOpacity
            style={[s.flx_row, s.aic, s.pa2, s.mb3, s.bg_gray]}
            onPress={this._onLoginPress}
            disabled={!this.state.email || !this.state.password}
          >
            <Text style={[s.white]}>Login</Text>
          </TouchableOpacity>

          {this.props.authError ? <Text>{this.props.authError}</Text> : null}

          <TouchableOpacity style={[s.flx_row, s.aic, s.pa2, s.bg_blue]} onPress={this._onFacebookLoginPress}>
            <Icon name="facebook" size={20} style={[s.white, s.pa1, s.pr2]} />
            <Text style={[s.white]}>Continue with facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.pa2} onPress={this._onRegisterPress}>
            <Text>Press to register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.pa2} onPress={this._onAnonymousLoginPress}>
            <Text>Continue without logging in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized,
  authError: state.errors.authError
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators(actionCreators, dispatch);

export const ScreenLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenLogin);
