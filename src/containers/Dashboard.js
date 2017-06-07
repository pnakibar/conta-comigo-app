import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import ValueShow from './../components/ValueShow';
import Navbar from './../components/Navbar';
import defaults from './../defaults';
import ActionButton from './../components/ActionButton';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  paddingBottom50: {
    paddingBottom: 50,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
});

export default class Dashboard extends Component {
  render() {
    return (
      <ActionButton {...this.props}>
        <View style={{ flex: 1 }}>
          <Navbar
            titleString="Bem vindo!"
            onPressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          />
          <View style={styles.container}>
            <View style={[styles.paddingBottom10]}>
              <ValueShow
                label="Volume de vendas"
                value="R$ 5000,00"
                message="Vendas realizadas até o dia de hoje"
              />
            </View>
            <View style={[styles.paddingBottom50]}>
              <ValueShow
                label="Contas em aberto"
                value="R$ 300,00"
                valueColor="#F11"
                message="Valor atualizado de contas a receber"
              />
            </View>
            <View style={[styles.paddingBottom10]}>
              <Button
                icon={{ name: 'plus', type: 'font-awesome' }}
                title="Cadastre nova venda"
                backgroundColor={defaults.color.main}
              />
            </View>
            <View style={[styles.paddingBottom10]}>
              <Button
                icon={{ name: 'plus', type: 'font-awesome' }}
                title="Cadastre novo cliente"
                backgroundColor={defaults.color.main}
              />
            </View>
            <View style={[styles.paddingBottom10]}>
              <Button
                icon={{ name: 'plus', type: 'font-awesome' }}
                title="Cadastre novo item"
                backgroundColor={defaults.color.main}
              />
            </View>
          </View>
        </View>
      </ActionButton>
    );
  }
}
