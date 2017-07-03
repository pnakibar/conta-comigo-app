import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AsyncStorage, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';
import Vendas from './containers/Vendas';
import NovaVenda from './containers/NovaVenda';
import NovoCliente from './containers/NovoCliente';
import NovoItem from './containers/NovoItem';
import Items from './containers/Items';
import Clientes from './containers/Clientes';
import Login from './containers/Login';
import Logout from './containers/Logout';

import { actions as loginActions } from './state/login';

const Router = StackNavigator(
  {
    Home: {
      screen: DrawerNavigator({
        Home: {
          screen: Dashboard,
        },
        Vendas: {
          screen: Vendas,
          label: 'Vendas',
        },
        Itens: {
          screen: Items,
        },
        Clientes: {
          screen: Clientes,
        },
        Logout: {
          screen: Logout,
        },
      }),
    },
    NovaVenda: {
      screen: NovaVenda,
    },
    NovoCliente: {
      screen: NovoCliente,
    },
    NovoItem: {
      screen: NovoItem,
    },
  },
  { headerMode: 'none' },
);

class GeneralNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentWillMount() {
    try {
      const auth = await AsyncStorage.getItem('authorization');
      if (auth) {
        this.props.loginActions.setToken(auth);
      }
      this.setState({ isLoading: false });
    } catch (e) {
      // do nothing
    }
  }

  render() {
    if (this.state.isLoading) {
      return <View />; // splash
    }
    if (!this.props.loginState.authorization) {
      return <Login />;
    }
    return <Router />;
  }
}
export default connect(
  state => ({
    loginState: state.login,
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch),
  }),
)(GeneralNavigator);
