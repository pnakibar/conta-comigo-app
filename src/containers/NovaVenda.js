import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

import Navbar from './../components/Navbar';
import SalesList from './../components/SalesList';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.openNewVenda = this.openNewVenda.bind(this);
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  openNewVenda() {
    this.props.navigation.navigate('NewVenda');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navbar
          titleString="Nova Venda"
          onPressLeft={() => this.props.navigation.goBack()}
          iconName="close"
        />
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <FormLabel>Name</FormLabel>
            <FormInput />
            <FormValidationMessage>ErrorMessage</FormValidationMessage>
          </View>
        </View>
      </View>
    );
  }
}
