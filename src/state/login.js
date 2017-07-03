import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const types = {
  IS_LOADING: 'IS_LOADING',
  HAS_ERROR: 'HAS_ERROR',
  HAS_FETCHED: 'HAS_FETCHED',
};
function login({ email, password }) {
  return (dispatch) => {
    dispatch({ type: types.IS_LOADING });
    axios
      .post('https://protected-bastion-53873.herokuapp.com/api/sessions', {
        email,
        password,
      })
      .then((response) => {
        const data = response.data.data;
        dispatch({
          type: types.HAS_FETCHED,
          authorization: data.authorization,
          hasAuthorization: true,
        });
        AsyncStorage.setItem('authorization', data.authorization);
      })
      .catch((e) => {
        dispatch({
          type: types.HAS_ERROR,
          error: e.response.data.message,
        });
      });
  };
}

export const actions = {
  login,
};

const defaultState = {
  isLoading: false,
  hasError: false,

  hasAuthorization: false,
  authorization: null,
  error: null,
};

export function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case types.IS_LOADING:
      return Object.assign(defaultState, {
        isLoading: true,
      });
    case types.HAS_FETCHED:
      return Object.assign({}, state, {
        authorization: action.authorization,
        isLoading: false,
        hasData: action.hasData,
      });
    case types.HAS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        isLoading: false,
        hasError: true,
      });
    default:
      return state;
  }
}
