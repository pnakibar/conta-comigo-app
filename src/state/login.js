import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const types = {
  IS_LOADING: 'LOGIN_IS_LOADING',
  HAS_ERROR: 'LOGIN_HAS_ERROR',
  HAS_FETCHED: 'LOGIN_HAS_FETCHED',
  SET_TOKEN: 'LOGIN_SET_TOKEN',
  LOG_OUT: 'LOG_OUT',
};
function login({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.IS_LOADING });
      const payload = { email, password };
      const response = await axios.post(
        'https://protected-bastion-53873.herokuapp.com/api/sessions',
        payload,
      );
      const token = response.data.token;
      dispatch({
        type: types.HAS_FETCHED,
        authorization: token,
        hasAuthorization: true,
      });
      await AsyncStorage.setItem('authorization', token);
    } catch (e) {
      dispatch({
        type: types.HAS_ERROR,
        error: e.response.data.message,
      });
    }
  };
}
function signup({ email, password, name }) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.IS_LOADING });
      const payload = { email, password, name, store: { name } };
      const response = await axios.post(
        'https://protected-bastion-53873.herokuapp.com/api/registrations',
        payload,
      );
      const token = response.data.token;
      dispatch({
        type: types.HAS_FETCHED,
        authorization: token,
        hasAuthorization: true,
      });
      await AsyncStorage.setItem('authorization', token);
    } catch (e) {
      dispatch({
        type: types.HAS_ERROR,
        error: e.response.data.message ||
          'Ocorreu um erro no registro, tente novamente.',
      });
    }
  };
}

function logout() {
  return async (dispatch) => {
    dispatch({ type: types.LOG_OUT });
    await AsyncStorage.removeItem('authorization');
  };
}

function setToken(token) {
  return async (dispatch) => {
    dispatch({ type: types.SET_TOKEN, authorization: token });
  };
}

export const actions = {
  login,
  signup,
  logout,
  setToken,
};

const defaultState = {
  isLoading: false,
  hasError: false,

  hasAuthorization: false,
  authorization: null,
  error: '',
};

export function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case types.SET_TOKEN:
      return Object.assign({}, state, { authorization: action.authorization });
    case types.LOG_OUT:
      return Object.assign({}, state, { authorization: null });
    case types.IS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false,
        error: '',
        hasAuthorization: false,
      });
    case types.HAS_FETCHED:
      return Object.assign({}, state, {
        authorization: action.authorization,
        isLoading: false,
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
