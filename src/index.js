/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './router';

const store = configureStore();

export default class contacomigo extends Component {
  render() {
    return <Provider store={store}><Router /></Provider>;
  }
}
