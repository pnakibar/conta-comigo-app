import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Drawer from 'react-native-drawer';
import { Actions } from 'react-native-router-flux';

export default class NavigationDrawer extends Component {
  render() {
    return (
      <Drawer
        type="displace"
        content={<View><Text>{'Fala aí seus lixo'}</Text></View>}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        {this.props.children}
      </Drawer>
    );
  }
}
