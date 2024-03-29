import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";
import homeReducer from "./slices/homeSlice";
import mediaReducer from "./slices/mediaSlice";
import layoutReducer from "./slices/layoutSlice";

const rootReducer = combineReducers({
  authReducer,
  homeReducer,
  mediaReducer,
  layoutReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type Action<P> = { type: string; payload?: P };

export default rootReducer;
