import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import numeral from 'numeral';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ValueShow from './../components/ValueShow';
import Navbar from './../components/Navbar';
import defaults from './../defaults';
import ActionButton from './../components/ActionButton';
import { actions as vendasActions } from './../state/vendas';

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

class Dashboard extends Component {
  componentWillMount() {
    this.props.vendasActions.fetch(true);
  }
  render() {
    const { vendasState } = this.props;
    console.log(
      _.flatMap(vendasState.data, x => x.items).reduce((acc, a) => {
        const value = Number(a.quantity) * Number(a.product_id.price);
        return acc + value;
      }, 0),
    );
    const totalVendas = vendasState.hasData
      ? _.flatMap(vendasState.data, x => x.items).reduce((acc, a) => {
        const value = Number(a.quantity) * Number(a.product_id.price);
        return acc + value;
      }, 0)
      : '0.00';
    const totalEmAberto = '0.00';
    return (
      <ActionButton {...this.props}>
        <View style={{ flex: 1 }}>
          <Navbar
            titleString="Bem vindo!"
            onPressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          />
          <View style={styles.container}>
            <View style={[styles.paddingBottom10]}>
              {vendasState.isFetching === true
                ? <Spinner />
                : <ValueShow
                  label="Volume de vendas"
                  value={`R$ ${numeral(totalVendas).format('0.00')}`}
                  message="Vendas realizadas até o dia de hoje"
                />}

            </View>
            <View style={[styles.paddingBottom50]}>
              {vendasState.isFetching === true
                ? <Spinner />
                : <ValueShow
                  label="Contas em aberto"
                  value={`R$ ${numeral(totalEmAberto).format('0.00')}`}
                  valueColor="#F11"
                  message="Valor atualizado de contas a receber"
                />}
            </View>
          </View>
        </View>
      </ActionButton>
    );
  }
}

export default connect(
  state => ({
    vendasState: state.vendas,
  }),
  dispatch => ({
    vendasActions: bindActionCreators(vendasActions, dispatch),
  }),
)(Dashboard);
