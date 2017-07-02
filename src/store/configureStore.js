import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import ravenMiddleware from 'redux-raven-middleware';
// import createLogger from 'redux-logger';
// import { SENTRY_DNS } from '../config/constants';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      // createLogger()
    ),
  );

  return createStore(reducers, initialState, enhancer);
}

export default configureStore;
