import { combineEpics, createEpicMiddleware } from "redux-observable";
import { configureStore } from "@reduxjs/toolkit";

import reactotron from "../../reactotron";
import rootReducer from "./rootReducer";
import { authEpics, homeEpics, mediaEpics } from "./slices";

export const rootEpic = combineEpics(...authEpics, ...homeEpics, ...mediaEpics);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
});

epicMiddleware.run(rootEpic);

export { store };
