import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { styles as s } from 'react-native-style-tachyons';
import { elevations } from '../theme/global-styles';
import Avatar from '../components/Avatar';
import actionCreators from '../redux/actions';

export class DrawerMainMenu extends Component {
  _requestLogout = () => {
    this.props.clearAllErrors();
    this.props.requestLogout();
  };
  render() {
    const { me } = this.props;
    return (
      <ScrollView style={[elevations.e_10, s.f, s.flx_i, s.bg_black]}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={[s.f, s.flx_row, s.bg_darkGray, s.pa2, s.jcsb, s.aic]}>
            <View>
              <Avatar user={me} />
            </View>

            <TouchableOpacity style={[s.flx_row]} onPress={this._requestLogout}>
              <Text style={[s.white, s.pr2]}>Log Out</Text>
              <Icon name="ios-log-out" size={20} style={s.white} />
            </TouchableOpacity>
          </View>

          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

DrawerMainMenu.propTypes = {
  navigation: PropTypes.object,
  me: PropTypes.object,
  requestLogout: PropTypes.func,
  clearError: PropTypes.func
};

const mapStateToProps = state => ({
  me: state.me
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const DrawerMainMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMainMenu);
