import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import Loading from './components/universal/Loading';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
