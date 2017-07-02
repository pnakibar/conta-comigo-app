import axios from 'axios';

export const types = {
  IS_FETCHING: 'VENDAS_IS_FETCHING',
  HAS_FETCHED: 'VENDAS_HAS_FETCHED',
};

export const actions = {
  fetch() {
    return (dispatch) => {
      dispatch({ type: types.IS_FETCHING });
      axios
        .get('https://protected-bastion-53873.herokuapp.com/api/orders', {
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
    };
  },
};

const defaultState = {
  isFetching: false,
  hasData: false,
  data: [],
};

export function reducer(state = defaultState, action = {}) {
  switch (action.type) {
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
