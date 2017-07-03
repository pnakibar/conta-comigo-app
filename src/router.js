import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';
import Vendas from './containers/Vendas';
import NovaVenda from './containers/NovaVenda';
import NovoCliente from './containers/NovoCliente';
import NovoItem from './containers/NovoItem';
import Items from './containers/Items';
import Clientes from './containers/Clientes';
import Login from './containers/Login';

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
      shouldLogin: true,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('authorization')
      .then((v) => {
        if (v.length > 0) {
          return this.setState({ shouldLogin: false });
        }
        return this.setState({ shouldLogin: true });
      })
      .catch(() => this.setState({ shouldLogin: true }));
  }

  render() {
    if (this.state.shouldLogin === true) {
      return <Login />;
    }
    return <Router />;
  }
}
export default GeneralNavigator;
// export default GeneralNavigator;
