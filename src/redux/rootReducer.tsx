import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  authReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type Action<P> = { type: string; payload?: P };

export default rootReducer;
