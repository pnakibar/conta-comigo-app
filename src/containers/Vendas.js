import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt-br';
import numeral from 'numeral';

import { actions as vendasActions } from './../state/vendas';
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

class Vendas extends Component {
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

  componentWillMount() {
    this.props.vendasActions.fetch(true);
  }

  render() {
    const { vendasState } = this.props;
    // boa sorte
    moment.locale('pt');
    const data = vendasState.hasData
      ? _.flow(
          v => _.flatMap(v, x => x.items),
          v =>
            _.reduce(
              v,
              (acc, a) => {
                const month = moment(a.date).format('MMMM');
                if (!acc[month]) {
                  acc[month] = [];
                }
                acc[month].push(a);
                return acc;
              },
              {},
            ),
          v =>
            Object.keys(v).map(k => ({
              label: k,
              value: v[k].reduce((acc, a) => {
                const totalValue =
                  Number(a.quantity) * Number(a.product_id.price);
                return acc + totalValue;
              }, 0),
            })),
          v =>
            v.map(value => ({
              ...value,
              value: `R$ ${numeral(value.value).format('0.00')}`,
            })),
        )(vendasState.data)
      : [];

    return (
      <ActionButton {...this.props}>
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Navbar titleString="Vendas" onPressLeft={() => this.openDrawer()} />
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Visão Geral</Text>
            </View>
            <View style={styles.salesContainer}>
              {vendasState.isFetching === true
                ? <Spinner />
                : <SalesList data={data} onTouch={() => {}} />}
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
)(Vendas);
