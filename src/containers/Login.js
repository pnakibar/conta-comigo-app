import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import defaults from './../defaults';
import { actions as loginActions } from './../state/login';
import logo from './../res/logo-with-name.png';

const styles = StyleSheet.create({
  combo: {
    width: '60%',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      method: 'login',
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
  }

  login() {
    const { email, password } = this.state;
    this.props.loginActions.login({ email, password });
  }

  signup() {
    const { email, password, name } = this.state;
    this.props.loginActions.signup({ email, password, name });
  }

  renderSignUp() {
    return (
      <View style={styles.combo}>
        <TextInput
          underlineColorAndroid={defaults.color.main}
          selectionColor={defaults.color.main}
          style={styles.textInput}
          placeholder="Nome"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          underlineColorAndroid={defaults.color.main}
          selectionColor={defaults.color.main}
          style={styles.textInput}
          placeholder="E-email"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          selectionColor={defaults.color.main}
          underlineColorAndroid={defaults.color.main}
          style={styles.textInput}
          placeholder="Senha"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="Registro"
          onPress={() => this.signup()}
          color={defaults.color.main}
        />
        <TouchableOpacity onPress={() => this.setState({ method: 'login' })}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.forgotPassword} textAlign="center">
              Já tem conta?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderLogin() {
    return (
      <View style={styles.combo}>
        <TextInput
          underlineColorAndroid={defaults.color.main}
          selectionColor={defaults.color.main}
          style={styles.textInput}
          placeholder="E-email"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          selectionColor={defaults.color.main}
          underlineColorAndroid={defaults.color.main}
          style={styles.textInput}
          placeholder="Senha"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="Login"
          onPress={() => this.login()}
          color={defaults.color.main}
        />
        <TouchableOpacity onPress={() => this.setState({ method: 'signup' })}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.forgotPassword} textAlign="center">
              Primeiro Acesso?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
        <Text textAlign="center" style={[styles.text, { color: 'red' }]}>
          {this.props.loginState.error}
        </Text>
        {this.state.method === 'login'
          ? this.renderLogin()
          : this.renderSignUp()}
        {this.props.loginState.isLoading
          ? <Spinner />
          : <Spinner color="white" />}
      </View>
    );
  }
}

export default connect(
  state => ({
    loginState: state.login,
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch),
  }),
)(Login);
