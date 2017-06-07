import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import faker from 'faker';
import _ from 'lodash';

import Navbar from './../components/Navbar';
import ModalSelector from './../components/ModalSelector';
import Label from './../components/Label';
import defaults from './../defaults';

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

export default class Dashboard extends Component {
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
      product =>
        _.has(product, 'qty') &&
        Number(product.qty) > 0 &&
        _.has(product, 'label') &&
        _.has(product, 'preco'),
    );
    const isProductsValid = _.reduce(validateProducts, (a, b) => a && b);
    if (!isProductsValid) {
      return invalidate();
    }
    return this.setState({ isValid: true });
  }

  save() {
    this.props.navigation.goBack();
  }

  renderProducts() {
    const randomName = [];
    for (let index = 0; index < 15; index++) {
      randomName.push({ label: faker.name.findName(), preco: 2500 });
    }
    return this.state.products.map((product, i) => (
      <View key={`product-selector-${i}`} style={styles.produtoContainer}>
        <ModalSelector
          buttonLabel="Produto"
          data={randomName}
          onSelectData={data =>
            this.updateProduct(i, {
              label: data.label,
              preco: data.preco,
              produto: data,
            })}
        />
        <Label name="Quantidade" />
        <TextInput
          keyboardType="numeric"
          onChangeText={n => this.updateProduct(i, { qty: n })}
        />
      </View>
    ));
  }

  render() {
    const randomName = [];
    for (let index = 0; index < 15; index++) {
      randomName.push({ label: faker.name.findName(), preco: 2500 });
    }
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
              data={randomName}
              onSelectData={data => this.setCliente(data)}
            />
          </View>
          {this.renderProducts()}
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
