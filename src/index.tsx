import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import './index.scss';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import App from './components/App';
import reducer from './reducer/reducer';

const store = createStore(reducer);

console.log('СТЭЙТ: ', store.getState());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
