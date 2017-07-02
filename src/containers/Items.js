import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';

import ActionButton from './../components/ActionButton';
import { actions as itemsActions } from './../state/items';

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

class Items extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.openNewVenda = this.openNewVenda.bind(this);
  }

  componentWillMount() {
    this.props.itemsActions.fetch(true);
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  openNewVenda() {
    this.props.navigation.navigate('NewVenda');
  }

  render() {
    console.log(this.props.itemsState);
    const { itemsState } = this.props;
    return (
      <ActionButton {...this.props}>
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Navbar titleString="Itens" onPressLeft={() => this.openDrawer()} />
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Itens</Text>
            </View>
            <View style={styles.salesContainer}>
              {itemsState.isFetching
                ? <Spinner />
                : <SalesList
                  data={itemsState.data.map(item => ({
                    label: item.name,
                    value: `R$ ${item.price}`,
                  }))}
                  onTouch={label => console.log(label)}
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
    itemsState: state.items,
  }),
  dispatch => ({
    itemsActions: bindActionCreators(itemsActions, dispatch),
  }),
)(Items);
