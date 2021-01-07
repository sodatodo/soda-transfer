import { createStore, applyMiddleware, Middleware } from 'redux';
import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './store/reducers';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
export const runSaga = sagaMiddleware.run;

const configureStore = (initialState = {}, historyInstance: History) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(historyInstance),
  ];

  const enhancers = (middlewareArray: Middleware[]) => composeWithDevTools(
    applyMiddleware(...middlewareArray),
  );

  const store = createStore(
    createRootReducer(historyInstance),
    initialState,
    enhancers(middlewares),
  );

  return store;
};

export default configureStore;
