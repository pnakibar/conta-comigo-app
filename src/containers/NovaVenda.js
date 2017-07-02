import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import faker from 'faker';
import _ from 'lodash';
import numeral from 'numeral';
import t from 'tcomb-form-native';
import moment from 'moment';

import Navbar from './../components/Navbar';
import ModalSelector from './../components/ModalSelector';
import Label from './../components/Label';
import defaults from './../defaults';

import { actions as clientesActions } from './../state/clientes';
import { actions as itemsActions } from './../state/items';
import { actions as vendasActions } from './../state/vendas';

const Form = t.form.Form;

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  clienteContainer: {
    paddingBottom: 30,
  },
  produtoContainer: {
    paddingBottom: 10,
  },
  lastElement: {
    padding: 50,
  },
  pd10: {
    paddingBottom: 10,
  },
});

class NovaVenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{ label: '', qty: 0 }],
      isValid: false,
    };
    this.renderProducts = this.renderProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.save = this.save.bind(this);
    this.validate = this.validate.bind(this);
    this.setCliente = this.setCliente.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }
  setCliente(cliente) {
    this.setState({ cliente });
    this.validate();
  }
  updateProduct(index, newProduct) {
    const { products } = this.state;
    if (newProduct.qty) {
      newProduct.qty = Number(newProduct.qty);
    }
    products[index] = { ...products[index], ...newProduct };
    this.setState({ products });
    this.validate();
  }

  addProduct() {
    this.setState({
      products: [...this.state.products, { label: '', qty: 0 }],
      isValid: false,
    });
  }

  removeProduct() {
    const length = this.state.products.length;
    const newArr = this.state.products.slice(0, length - 1);
    this.setState({
      products: newArr,
    });
  }

  validate() {
    const invalidate = () => this.setState({ isValid: false });
    const { cliente, products } = this.state;
    if (_.isUndefined(cliente)) return invalidate();
    if (products.length === 0) return invalidate();
    const validateProducts = _.map(
      products,
      product => _.has(product, 'qty') && Number(product.qty) > 0,
    );
    const isProductsValid = _.reduce(validateProducts, (a, b) => a && b);
    if (!isProductsValid) {
      return invalidate();
    }
    return this.setState({ isValid: true });
  }

  save() {
    const { cliente, products } = this.state;
    const { date } = this.refs.form.getValue();

    const payload = {
      customer_id: cliente.id,
      date,
      items: products.map(x => ({ product_id: x.data.id, quantity: x.qty })),
    };

    this.props.vendasActions.create(payload);
    this.props.navigation.navigate('Vendas');
  }

  renderProducts() {
    const { itemsState } = this.props;
    const items = itemsState.data.length > 0
      ? itemsState.data.map(c => ({
        ...c,
        label: `${c.name} - R$ ${numeral(c.price).format('0.00')}`,
      }))
      : [];
    return this.state.products.map((product, i) => (
      <View key={`product-selector-${i}`} style={styles.produtoContainer}>
        <ModalSelector
          buttonLabel="Produto"
          data={items}
          onSelectData={data => this.updateProduct(i, { data, qty: 1 })}
        />
        <Label name="Quantidade" />
        <TextInput
          keyboardType="numeric"
          value={`${this.state.products[i].qty}`}
          onChangeText={n => this.updateProduct(i, { qty: n })}
        />
      </View>
    ));
  }

  componentWillMount() {
    this.props.clientesActions.fetch(true);
    this.props.itemsActions.fetch(true);
  }
  calculateTotal() {
    const total = this.state.products.reduce((acc, a) => {
      if (!a.data) return acc;
      const price = Number(a.qty) * Number(a.data.price);
      return acc + price;
    }, 0);
    return total;
  }
  render() {
    const { clientesState } = this.props;
    const clientes = clientesState.data.length > 0
      ? clientesState.data.map(c => ({
        ...c,
        label: c.name || 'no_visible_name',
      }))
      : [];

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Navbar
          titleString="Nova Venda"
          onPressLeft={() => this.props.navigation.goBack()}
          iconName="close"
        />
        <ScrollView style={styles.container}>
          <View style={styles.clienteContainer}>
            <ModalSelector
              buttonLabel="Cliente"
              data={clientes}
              onSelectData={data => this.setCliente(data)}
            />
          </View>
          {this.renderProducts()}
          <View style={styles.pd10}>
            <Form
              ref="form"
              type={t.struct({ date: t.Date })}
              options={{
                fields: {
                  date: {
                    label: 'Data de venda',
                    config: {
                      format: date => moment(date).format('DD/MM/YYYY'),
                    },
                  },
                },
              }}
            />
          </View>
          <View style={styles.pd10}>
            <Text style={{ fontSize: 24 }}>
              Total:
              {`R$ ${numeral(this.calculateTotal()).format('0.00')}`}
            </Text>
          </View>
          <View style={styles.pd10}>
            <Button
              title="RemoverProduto"
              backgroundColor={defaults.color.red}
              disabled={this.state.products.length <= 1}
              onPress={() => this.removeProduct()}
            />
          </View>
          <View style={styles.pd10}>
            <Button
              title="Adicionar Produto"
              backgroundColor={defaults.color.blue}
              onPress={() => this.addProduct()}
            />
          </View>
          <View style={styles.pd10}>
            <Button
              title="Salvar"
              backgroundColor={defaults.color.green}
              onPress={() => this.save()}
              disabled={!this.state.isValid}
            />
          </View>
          <View style={styles.lastElement} />
        </ScrollView>
      </View>
    );
  }
}
export default connect(
  state => ({
    clientesState: state.clientes,
    vendasState: state.vendas,
    itemsState: state.items,
  }),
  dispatch => ({
    clientesActions: bindActionCreators(clientesActions, dispatch),
    itemsActions: bindActionCreators(itemsActions, dispatch),
    vendasActions: bindActionCreators(vendasActions, dispatch),
  }),
)(NovaVenda);
