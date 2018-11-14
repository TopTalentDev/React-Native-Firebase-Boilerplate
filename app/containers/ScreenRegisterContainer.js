import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, layout, flexbox } from '../theme/global-styles';

export class ScreenRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  _onRegisterPress = () => {
    this.props.clearError('authError');
    this.props.requestUserCreateWithEmailAndPassword(this.state.email, this.state.password);
  };

  _onEmailChange = email => {
    this.setState({ email });
  };

  _onPasswordChange = password => {
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

ScreenRegister.propTypes = {
  me: PropTypes.object,
  isInitialized: PropTypes.bool,
  navigation: PropTypes.object,
  authError: PropTypes.string,
  requestUserCreateWithEmailAndPassword: PropTypes.func,
  clearError: PropTypes.func
};

const mapStateToProps = state => ({
  authError: state.errors.authError
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenRegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenRegister);
