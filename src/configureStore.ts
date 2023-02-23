import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import { IStateGlobal } from './interfaces/interfaces';
import loggerMiddleware from './middlewares/loggerMiddleware';
import rootReducer from './reducer/reducer';

import tickets from './tickets.json';

// import thunkMiddleware from 'redux-thunk';

const configureStore = (preloadedState?: IStateGlobal) => {
  const middlewares = [loggerMiddleware]; // thunkMiddleware
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers =
    composeWithDevTools(...enhancers) || compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer/reducer', () =>
      store.replaceReducer(rootReducer),
    );
  }
  return store;
};

const store = configureStore(tickets);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

// ---------------with toolkit:

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
// import rootReducer from './reducers'

// export default function configureAppStore(preloadedState) {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: [loggerMiddleware, ...getDefaultMiddleware()],
//     preloadedState,
//     enhancers: [monitorReducersEnhancer]
//   })

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }
