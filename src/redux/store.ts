import { combineEpics, createEpicMiddleware } from "redux-observable";
import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer";
import { authEpics } from "./slices";
import reactotron from "../../reactotron"

export const rootEpic = combineEpics(...authEpics);

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  enhancers: (__DEV__ && [reactotron.createEnhancer()]) || undefined,
})

epicMiddleware.run(rootEpic);

export { store };
