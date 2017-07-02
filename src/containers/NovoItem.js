import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as itemsActions } from './../state/items';
import Navbar from './../components/Navbar';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});

const Form = t.form.Form;
const Item = t.struct({
  nome: t.String,
  valor: t.Number,
  // tipo: t.enums({ produto: 'Produto', servico: 'Serviço' }),
});

class NovoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Navbar
          titleString="Novo Item"
          onPressLeft={() => this.props.navigation.goBack()}
          iconName="close"
        />
        <ScrollView style={styles.container}>
          <Form type={Item} value={{ tipo: 'produto' }} ref="form" />
          <Button
            title="Salvar"
            backgroundColor={defaults.color.main}
            onPress={() => {
              const { nome, valor } = this.refs.form.getValue();
              this.props.itemsActions.create({ price: valor, name: nome });
              this.props.navigation.navigate('Itens');
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    itemsActions: bindActionCreators(itemsActions, dispatch),
  }),
)(NovoItem);
