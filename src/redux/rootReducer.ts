import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";
import homeReducer from "./slices/homeSlice";

const rootReducer = combineReducers({
  authReducer,
  homeReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type Action<P> = { type: string; payload?: P };

export default rootReducer;
