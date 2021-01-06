import { createStore, applyMiddleware, Middleware } from 'redux';
import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './store/reducers';

export const history = createBrowserHistory();

const configureStore = (initialState = {}, historyInstance: History) => {
  const middlewares = [
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
