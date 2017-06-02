import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import defaults from "./../defaults";
import logo from "./../res/logo-with-name.png;

const styles = StyleSheet.create({
  combo: {
    width: '60%',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    justifyContent: 'center',
    color: defaults.color.main,
  },
  textInput: {},
  logo: {
    width: 150,
    height: 150,
  },
  forgotPassword: {
    paddingTop: 30,
    color: 'grey',
  },
});

export default class Login extends Component {
  static navigationOptions = {
    drawerLabel: 'Login',
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    const { email, password } = this.state;
    console.log(email, password);
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text} textAlign="center">
          Seja bem vindo ao Conta Comigo!
        </Text>
        <Text textAlign="center" style={styles.text}>
          O seu aplicativo de controle de vendas.
        </Text>
        <View style={styles.combo}>
          <TextInput
            underlineColorAndroid={defaults.color.main}
            selectionColor={defaults.color.main}
            style={styles.textInput}
            placeholder="E-email"
            keyboardType="email-address"
            onChange={email => this.setState({ email })}
          />
          <TextInput
            selectionColor={defaults.color.main}
            underlineColorAndroid={defaults.color.main}
            style={styles.textInput}
            placeholder="Senha"
            secureTextEntry
            onChange={password => this.setState({ password })}
          />
          <Button
            title="Login"
            onPress={this.login}
            color={defaults.color.main}
          />
        </View>
        <Text style={styles.forgotPassword} textAlign="center">
          Esqueceu a senha?
        </Text>
      </View>
    );
  }
}
