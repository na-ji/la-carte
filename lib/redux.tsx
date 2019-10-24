import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import { initializeStore } from './store';

export const withRedux = PageComponent => {
  const WithRedux = ({ ...props }) => {
    const { store, persistor } = getOrInitializeStore();

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PageComponent {...props} />
        </PersistGate>
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents');
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  return WithRedux;
};

let reduxStore;
const getOrInitializeStore = () => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore();
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore();
  }

  return reduxStore;
};
