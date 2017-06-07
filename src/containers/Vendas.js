import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButton from './../components/ActionButton';

import Navbar from './../components/Navbar';
import SalesList from './../components/SalesList';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingBottom50: {
    paddingBottom: 50,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  titleContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    color: defaults.color.main,
    fontWeight: 'bold',
  },
  salesContainer: {
    alignSelf: 'stretch',
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
      <ActionButton {...this.props}>
        <View style={{ flex: 1 }}>
          <Navbar titleString="Vendas" onPressLeft={() => this.openDrawer()} />
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Visão Geral</Text>
            </View>
            <View style={styles.salesContainer}>
              <SalesList
                data={[
                  { label: 'March 2017', value: 'R$3000,00' },
                  { label: 'March 2017', value: 'R$3000,00' },
                ]}
                onTouch={label => console.log(label)}
              />
            </View>
          </View>
        </View>
      </ActionButton>
    );
  }
}
