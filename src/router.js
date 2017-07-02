import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';
import Vendas from './containers/Vendas';
import NovaVenda from './containers/NovaVenda';
import NovoCliente from './containers/NovoCliente';
import NovoItem from './containers/NovoItem';
import Items from './containers/Items';
import Clientes from './containers/Clientes';

const GeneralNavigator = StackNavigator(
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
        Configuracoes: {
          screen: Dashboard,
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

export default GeneralNavigator;
