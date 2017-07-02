import axios from 'axios';

export const types = {
  IS_FETCHING: 'ITEMS_IS_FETCHING',
  HAS_FETCHED: 'ITEMS_HAS_FETCHED',
  IS_CREATING: 'ITEMS_IS_CREATING',
  HAS_CREATED: 'ITEMS_HAS_CREATED',
};
function fetch(refresh = false) {
  return (dispatch, getState) => {
    const { vendas } = getState();
    const doesNotHaveData = !vendas.hasData;
    const isNotFetching = !vendas.isFetching;
    if (refresh || doesNotHaveData || isNotFetching) {
      dispatch({ type: types.IS_FETCHING });
      axios
        .get('https://protected-bastion-53873.herokuapp.com/api/products', {
          headers: {
            Authorization: 'd87cfe94-6665-4c63-b5b9-58a3c1498545',
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          dispatch({
            type: types.HAS_FETCHED,
            data,
            hasData: data.length > 0,
          });
        })
        .catch((e) => {
          console.log(e);
          dispatch({
            type: types.HAS_FETCHED,
            data: [],
            hasData: false,
          });
        });
    }
  };
}
function create(product) {
  return (dispatch) => {
    dispatch({ type: types.IS_CREATING });
    axios
      .post(
        'https://protected-bastion-53873.herokuapp.com/api/products',
        { product: { ...product, store_id: 1 } },
      {
        headers: {
          Authorization: 'd87cfe94-6665-4c63-b5b9-58a3c1498545',
        },
      },
      )
      .then(() => {
        dispatch({ type: types.HAS_CREATED });
        return fetch(true);
      });
  };
}
export const actions = {
  create,
  fetch,
};

const defaultState = {
  isFetching: false,
  isCreating: false,
  hasData: false,
  data: [],
};

export function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case types.IS_CREATING:
      return Object.assign({}, state, { isCreating: true });
    case types.HAS_CREATED:
      return Object.assign({}, state, { isCreating: false });
    case types.IS_FETCHING:
      return Object.assign({}, state, { isFetching: true });
    case types.HAS_FETCHED:
      return Object.assign({}, state, {
        data: action.data,
        isFetching: false,
        hasData: action.hasData,
      });
    default:
      return state;
  }
}
