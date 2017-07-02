import { combineReducers } from 'redux';
import { reducer as vendas } from './../state/vendas';
import { reducer as items } from './../state/items';
import { reducer as clientes } from './../state/clientes';

export default combineReducers({
  vendas,
  items,
  clientes,
});
