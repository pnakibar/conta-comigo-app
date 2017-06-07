import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import ActionButton from './ActionButton';

export default class MetaContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <ActionButton navigation={this.props.navigation} />
      </View>
    );
  }
}
