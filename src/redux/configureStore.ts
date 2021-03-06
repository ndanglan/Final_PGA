import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['sideBarAction']
};

export default function configureStore(preloadedState: any) {

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
  );

  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      ),
    ),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
