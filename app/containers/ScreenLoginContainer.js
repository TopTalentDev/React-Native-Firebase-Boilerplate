import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers, layout, flexbox } from '../theme/global-styles';

export class ScreenLogin extends Component {
  _onAnonymousLoginPress = () => {
    this.props.requestAnonymousLogin();
  };
  render() {
    return (
      <View style={[containers.containerMain]}>
        <View style={flexbox.columnCentered}>
          <Text style={[s.f3, s.mb5]}>Login to Account</Text>
          <TextInput style={[s.pa2, layout.w100]} placeholder="username" />
          <TextInput
            style={[s.pa2, layout.w100]}
            placeholder="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={s.pa2} onPress={this._onAnonymousLoginPress}>
            <Text>Continue without logging in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ScreenLogin.propTypes = {
  me: PropTypes.object,
  isInitialized: PropTypes.bool,
  navigation: PropTypes.object,
  requestAnonymousLogin: PropTypes.func
};

const mapStateToProps = state => ({
  me: state.me,
  isInitialized: state.initialization.isInitialized
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const ScreenLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenLogin);
