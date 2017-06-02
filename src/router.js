import { DrawerNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';
import Vendas from './containers/Vendas';

const GeneralNavigator = DrawerNavigator({
  Home: {
    screen: Dashboard,
  },
  Vendas: {
    screen: Vendas,
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

export default GeneralNavigator;
