import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import AfridioAsyncStoreService from "../../services/asyncstorage/AfridioAsyncStoreService";
import AfridioApiService from "../../services/network/AfridioApiService";
import { Action } from "../rootReducer";

type AuthReducerType = {
  user: object | null;
  authenticating: boolean;
  authenticated: boolean;
  error: object | null;
  token: string | null;
  readingToken: boolean;
};

const initialState: AuthReducerType = {
  user: null,
  authenticating: false,
  authenticated: false,
  error: null,
  token: null,
  readingToken: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveTokenSuccess: (state, action) => ({
      ...state,
      authenticated: action.payload.authenticated,
      token: action.payload.token,
      readingToken: false,
    }),
    authStart: (state, _) => ({
      ...state,
      error: null,
      authenticating: true,
    }),
    authSuccess: (state, action) => ({
      ...state,
      authenticated: true,
      token: action.payload.token,
      error: null,
      authenticating: false,
      verifying: false,
    }),
    authFail: (state, action) => ({
      ...state,
      authenticated: false,
      authenticating: false,
      error: action.payload,
    }),
    authLogout: (state) => ({
      ...state,
      authenticated: false,
      user: {},
    }),
    authLogoutDone: (state) => ({
      ...state,
      token: null,
    }),
  },
});

export const loginEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(authStart.type),
    switchMap(({ payload }) => {
      const { phone_number, password } = payload;
      return AfridioApiService.login(phone_number, password).pipe(
        map((res) => {
          AfridioAsyncStoreService.putToken(res.token);
          return authSuccess(res);
        }),
        catchError((err) => {
          let message = "Something went wrong.";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            message = err._message.detail[0];
          }
          return of(authFail(message));
        })
      );
    })
  );

export const logoutEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(authLogout.type),
    switchMap(() => {
      return AfridioApiService.logout().pipe(
        map((res) => {
          AfridioAsyncStoreService.removeToken();

          return authLogoutDone();
        }),
        catchError((err) => {
          console.log(err.message);
          AfridioAsyncStoreService.removeToken();

          return of(authLogoutDone());
        })
      );
    })
  );

export const readToken = async () => {
  const token = await AfridioAsyncStoreService.getToken();

  return { token: token };
};

export const authEpics = [loginEpic, logoutEpic];

export const {
  retrieveTokenSuccess,
  authStart,
  authSuccess,
  authFail,
  authLogout,
  authLogoutDone,
} = authSlice.actions;

export default authSlice.reducer;
