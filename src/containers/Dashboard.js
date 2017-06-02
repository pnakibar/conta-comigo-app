import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ValueShow from './../components/ValueShow';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ValueShow
          label="Volume de vendas"
          value="R$ 5000,00"
          message="Vendas realizadas até o dia de hoje"
        />
        <ValueShow
          label="Contas em aberto"
          value="R$ 300,00"
          valueColor="#F11"
          message="Valor atualizado de contas a receber"
        />
      </View>
    );
  }
}
