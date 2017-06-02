import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';

const generalNavigator = DrawerNavigator({
  Home: {
    screen: Dashboard,
  },
  Vendas: {
    screen: Dashboard,
  },
  Itens: {
    screen: Dashboard,
  },
  Clientes: {
    screen: Dashboard,
  },
  Configuracoes: {
    screen: Dashboard,
  },
});

export default generalNavigator;
