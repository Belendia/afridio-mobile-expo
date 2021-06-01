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
  retrievingToken: boolean;
  registering: boolean;
  registered: boolean;
  verifying: boolean;
  token: string | null;
  password: string | null;
};

const initialState: AuthReducerType = {
  user: null,
  authenticating: false,
  authenticated: false,
  error: null,
  retrievingToken: true,
  registering: false,
  registered: false,
  verifying: false,
  token: null,
  password: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveTokenSuccess: (state, action) => ({
      ...state,
      retrievingToken: false,
      authenticated: action.payload.authenticated,
      token: action.payload.token,
    }),
    authStart: (state) => ({
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
      error: action.payload,
      authenticating: false,
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
    startRegistration: (state, action) => ({
      ...state,
      registering: true,
      registered: false,
      password: action.payload.password,
    }),
    registrationSuccess: (state, action) => ({
      ...state,
      user: action.payload.user,
      error: null,
      registering: false,
      registered: true,
    }),
    registrationFailed: (state, action) => ({
      ...state,
      error: action.payload,
      registering: false,
      registered: false,
    }),
    resetError: (state) => ({
      ...state,
      error: null,
    }),
    startVerification: (state, action) => ({
      ...state,
      verifying: true,
    }),
    verificationFailed: (state, action) => ({
      ...state,
      error: action.payload,
      verifying: false,
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
          return of(authFail(err));
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

export const registerEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startRegistration.type),
    switchMap(({ payload }) => {
      return AfridioApiService.register(payload).pipe(
        map((res) => {
          const userData = {
            user: {
              phone_number: res.phone_number,
              password: payload.password,
              session_token: res.session_token,
            },
          };

          return registrationSuccess(userData);
        }),
        catchError((err) => {
          return of(registrationFailed(err));
        })
      );
    })
  );

export const verifyEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startVerification.type),
    switchMap(({ payload }) => {
      return AfridioApiService.verify(payload).pipe(
        map((res) => {
          AfridioAsyncStoreService.putToken(res.token);
          return authSuccess(res);
        }),
        catchError((err) => {
          return of(verificationFailed(err));
        })
      );
    })
  );

export const authEpics = [loginEpic, logoutEpic, registerEpic, verifyEpic];

export const {
  retrieveTokenSuccess,
  authStart,
  authSuccess,
  authFail,
  authLogout,
  authLogoutDone,
  startRegistration,
  registrationSuccess,
  registrationFailed,
  resetError,
  startVerification,
  verificationFailed,
} = authSlice.actions;

export default authSlice.reducer;
