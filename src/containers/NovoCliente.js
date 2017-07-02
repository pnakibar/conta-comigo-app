import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';

import Navbar from './../components/Navbar';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});

const Form = t.form.Form;
const Cliente = t.struct({
  nome: t.String,
  telefone: t.Number,
  // endereco: t.String,
  // bairro: t.String,
  // cidade: t.String,
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Navbar
          titleString="Novo Cliente"
          onPressLeft={() => this.props.navigation.goBack()}
          iconName="close"
        />
        <ScrollView style={styles.container}>
          <Form type={Cliente} />
          <Button title="Salvar" backgroundColor={defaults.color.main} />
        </ScrollView>
      </View>
    );
  }
}
