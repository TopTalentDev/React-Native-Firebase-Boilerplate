import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//@ts-ignore
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, layout, flexbox } from '../theme/global-styles';

interface Props {
  isInitialized: boolean
  navigation: any
  authError: string
  requestUserCreateWithEmailAndPassword: Function
  clearError: Function
}

interface State {
  email: string | undefined
  password: string | undefined
}

export class ScreenRegister extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { email: undefined, password: undefined };
  }

  _onRegisterPress = () => {
    this.props.clearError('authError');
    this.props.requestUserCreateWithEmailAndPassword(this.state.email, this.state.password);
  };

  _onEmailChange = (email: string) => {
    this.setState({ email });
  };

  _onPasswordChange = (password: string) => {
    this.setState({ password });
  };

  render() {
    return (
      <View style={[containers.containerMain]}>
        <View style={flexbox.columnCentered}>
          <Text style={[s.f3, s.mb5]}>Register</Text>

          <TextInput
            style={[s.pa2, layout.w100]}
            placeholder="email"
            onChangeText={this._onEmailChange}
            value={this.state.email}
          />
          <TextInput
            style={[s.pa2, layout.w100]}
            placeholder="password"
            textContentType="password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this._onPasswordChange}
          />
          <TouchableOpacity style={[s.flx_row, s.aic, s.pa2, s.bg_gray]} onPress={this._onRegisterPress}>
            <Text style={[s.white]}>Register</Text>
          </TouchableOpacity>
          {this.props.authError ? <Text>{this.props.authError}</Text> : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state.errors.authError
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

export const ScreenRegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenRegister);
