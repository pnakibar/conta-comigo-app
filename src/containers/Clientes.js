import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import numeral from 'numeral';
import _ from 'lodash';

import ActionButton from './../components/ActionButton';
import { actions as clientesActions } from './../state/clientes';

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

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.renderSalesList = this.renderSalesList.bind(this);
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  componentWillMount() {
    this.props.clientesActions.fetch(true);
  }

  renderSalesList() {
    const { clientesState } = this.props;
    const data = clientesState.data.map(value => ({
      label: value.name || 'no_visible_name',
      id: value.id,
      value: _.flow(
        v => _.flatMap(v, orders => orders.items),
        v =>
          v.reduce((acc, a) => {
            const total = Number(a.quantity) * Number(a.product_id.price);
            return acc + total;
          }, 0),
        v => `R$ ${numeral(v).format('0.00')}`,
      )(value.orders),
    }));
    return <SalesList data={data} />;
  }

  render() {
    const { clientesState } = this.props;
    return (
      <ActionButton {...this.props}>
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Navbar
            titleString="Clientes"
            onPressLeft={() => this.openDrawer()}
          />
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Saldo de Contas</Text>
            </View>
            <View style={styles.salesContainer}>
              {clientesState.isFetching ? <Spinner /> : this.renderSalesList()}
            </View>
          </View>
        </View>
      </ActionButton>
    );
  }
}

export default connect(
  state => ({
    clientesState: state.clientes,
  }),
  dispatch => ({
    clientesActions: bindActionCreators(clientesActions, dispatch),
  }),
)(Clientes);
