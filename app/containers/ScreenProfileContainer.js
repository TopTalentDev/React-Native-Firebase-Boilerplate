import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles as s } from 'react-native-style-tachyons';
import actionCreators from '../redux/actions';
import { containers } from '../theme/global-styles';

export class ScreenProfileContainer extends Component {
  render() {
    return (
      <View style={containers.containerMain}>
        <Text style={s.f3}>Profile Details</Text>
        {this.props.me}
      </View>
    );
  }
}

ScreenProfileContainer.propTypes = {
  me: PropTypes.object
};

const mapStateToProps = state => ({
  me: state.me
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenProfileContainer);
