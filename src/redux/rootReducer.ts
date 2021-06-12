import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";
import registrationReducer from "./slices/registrationSlice";

const rootReducer = combineReducers({
  authReducer,
  registrationReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
export type Action<P> = { type: string; payload?: P };

export default rootReducer;
