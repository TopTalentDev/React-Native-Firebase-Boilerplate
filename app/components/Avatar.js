import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default class Avatar extends Component {
  render() {
    return <View>{this.props.me}</View>;
  }
}

Avatar.propTypes = {
  me: PropTypes.object
};
