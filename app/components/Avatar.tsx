import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface Props {
  user?: any;
}
export default class Avatar extends Component<Props> {
  static defaultProps: Props = {
    user: { profile: { name: 'unknown' } }
  };
  render() {
    return (
      <View>
        <Text>Avatar</Text>
        <Text>{this.props.user.profile ? this.props.user.profile.name : null}</Text>
      </View>
    );
  }
}
