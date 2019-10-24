import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducers from './stores/root-reducer';
import sagas from './stores/root-saga';
import MapTransform from './stores/map/persist-transformers';

const persistConfig = {
  key: 'la-carte',
  storage,
  whitelist: ['viewConfig', 'map'],
  transforms: [MapTransform]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const saga = createSagaMiddleware();

export function initializeStore() {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(saga))
  );
  let persistor = persistStore(store);
  saga.run(sagas);

  return { store, persistor };
}
