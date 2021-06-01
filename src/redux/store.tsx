import { createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import rootReducer from "./rootReducer";
import { authEpics } from "./slices";

export const rootEpic = combineEpics(...authEpics);

const epicMiddleware = createEpicMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let composeEnhancers = compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export { store };
