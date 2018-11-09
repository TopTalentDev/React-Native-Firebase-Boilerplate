import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Avatar extends Component {
  render() {
    return (
      <View>
        <Text>Avatar</Text>
        <Text>{this.props.me.profile.name}</Text>
      </View>
    );
  }
}

Avatar.propTypes = {
  me: PropTypes.object
};

Avatar.defaultProps = {
  me: { profile: { name: 'unknown' } }
};
