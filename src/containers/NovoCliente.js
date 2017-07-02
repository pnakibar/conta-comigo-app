import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as clientesActions } from './../state/clientes';
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
  email: t.String,
});

class NovoCliente extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {
    const { nome, telefone, email } = this.refs.form.getValue();
    const payload = {
      name: nome,
      phone: telefone,
      email,
    };
    this.props.clientesActions.create(payload);
    this.props.navigation.navigate('Clientes');
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
          <Form type={Cliente} ref="form" />
          <Button
            title="Salvar"
            backgroundColor={defaults.color.main}
            onPress={() => this.save()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    clientesActions: bindActionCreators(clientesActions, dispatch),
  }),
)(NovoCliente);
