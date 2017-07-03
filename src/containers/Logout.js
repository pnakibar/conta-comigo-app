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

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loginActions.logout();
  }

  render() {
    return <View />;
  }
}

export default connect(
  state => ({
    loginState: state.login,
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch),
  }),
)(Logout);
