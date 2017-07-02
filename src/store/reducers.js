import { combineReducers } from 'redux';
import { reducer as vendas } from './../state/vendas';
import { reducer as items } from './../state/items';

export default combineReducers({
  vendas,
  items,
});
