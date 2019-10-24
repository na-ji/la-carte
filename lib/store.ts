import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducers from './stores/root-reducer';

const persistConfig = {
  key: 'la-carte',
  storage,
  whitelist: ['viewConfig'] // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

const saga = createSagaMiddleware();

export function initializeStore() {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(saga))
  );
  let persistor = persistStore(store);

  return { store, persistor };
}
