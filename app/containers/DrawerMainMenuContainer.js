import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import _ from 'lodash';
import { styles as s } from 'react-native-style-tachyons';
import { elevations } from '../theme/global-styles';
import Avatar from '../components/Avatar';
import actionCreators from '../redux/actions';

export class DrawerMainMenu extends Component {
  render() {
    const { me } = this.props;
    return (
      <ScrollView style={[elevations.e_10, s.f, s.flx_i, s.bg_black]}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={[s.f, s.flx_row, s.bg_darkGray, s.pa2]}>
            {!_.isEmpty(me) && (
              <View>
                <Avatar user={me} />
              </View>
            )}
            <TouchableOpacity onPress={this._onSettingsPressed}>
              <Icon name="cogs" size={20} style={s.white} />
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
  me: PropTypes.object
};

const mapStateToProps = state => ({
  me: state.me
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const DrawerMainMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMainMenu);
