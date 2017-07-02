import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import numeral from 'numeral';

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
  }

  componentWillMount() {
    this.props.clientesActions.fetch(true);
  }

  render() {
    const { clientesState } = this.props;
    console.log('clientesState >>', clientesState);
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
              {clientesState.isFetching
                ? <Spinner />
                : <SalesList
                  data={clientesState.data.map(item => ({
                    label: `${item.first_name}`,
                    value: `${item.last_name}`,
                  }))}
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
    clientesState: state.clientes,
  }),
  dispatch => ({
    clientesActions: bindActionCreators(clientesActions, dispatch),
  }),
)(Clientes);
