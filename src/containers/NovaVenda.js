import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import faker from 'faker';

import Navbar from './../components/Navbar';
import ModalSelector from './../components/ModalSelector';
import defaults from './../defaults';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});

const Form = t.form.Form;
const Venda = t.struct({
  cliente: t.String,
  item: t.String,
});
const formOptions = {};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const randomName = [];
    for (let index = 0; index < 15; index++) {
      randomName.push({ label: faker.name.findName() });
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Navbar
          titleString="Nova Venda"
          onPressLeft={() => this.props.navigation.goBack()}
          iconName="close"
        />
        <ScrollView style={styles.container}>
          <Form type={Venda} options={formOptions} />
          <ModalSelector data={randomName} />
          <Button title="Salvar" backgroundColor={defaults.color.main} />
        </ScrollView>
      </View>
    );
  }
}
