import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import './index.scss';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './configureStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

// const renderApp = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>,
//     document.getElementById('root'),
//   );
// };

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp);
}

renderApp();
