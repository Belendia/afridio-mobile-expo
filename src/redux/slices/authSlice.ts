import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import AfridioAsyncStoreService from "../../services/asyncstorage/AfridioAsyncStoreService";
import AfridioApiService from "../../services/network/AfridioApiService";
import { Action } from "../rootReducer";

type User = {
  name: string;
  phone_number: string;
  sex: string;
  date_of_birth: string;
  picture: string;
  password: string;
  session_token: string;
};

type AuthReducerType = {
  user: User | null;
  authenticating: boolean;
  authenticated: boolean;
  authError: object | null;
  token: string | null;
  readingToken: boolean;
  regError: object | null;
  registering: boolean;
  registered: boolean;
  verifying: boolean;
  password: string | null;
  otp_expiration_time: number;
};

const initialState: AuthReducerType = {
  user: null,
  authenticating: false,
  authenticated: false,
  authError: null,
  token: null,
  readingToken: true,
  regError: null,
  registering: false,
  registered: false,
  verifying: false,
  password: null,
  otp_expiration_time: 100,
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
      authError: null,
      authenticating: true,
    }),
    authSuccess: (state, action) => ({
      ...state,
      authenticated: true,
      token: action.payload.token,
      authError: null,
      authenticating: false,
      verifying: false,
      registered: false,
      registering: false,
      regError: null,
    }),
    authFail: (state, action) => ({
      ...state,
      authenticated: false,
      authenticating: false,
      authError: action.payload,
    }),
    authLogout: (state) => ({
      ...state,
      authenticated: false,
      user: null,
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
      otp_expiration_time: action.payload.otp_expiration_time,
      regError: null,
      registering: false,
      registered: true,
    }),
    registrationFailed: (state, action) => ({
      ...state,
      regError: action.payload,
      registering: false,
      registered: false,
    }),
    startVerification: (state, _) => ({
      ...state,
      verifying: true,
    }),
    verificationFailed: (state, action) => ({
      ...state,
      regError: action.payload,
      verifying: false,
    }),
    resetRegError: (state) => ({
      ...state,
      regError: null,
    }),
    resetAuthError: (state) => ({
      ...state,
      authError: null,
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
          AfridioAsyncStoreService.removeToken();

          return of(authLogoutDone());
        })
      );
    })
  );

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
              name: res.name,
              sex: res.sex,
              date_of_birth: res.date_of_birth,
            },
            otp_expiration_time: res.otp_expiration_time,
          };

          return registrationSuccess(userData);
        }),
        catchError((err) => {
          let message: any = "Something went wrong.";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            message = {};
            for (const e in err._message) {
              message[e] = err.message[e][0];
            }
          }

          return of(registrationFailed(message));
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
          let message: any = "Something went wrong.";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            message = err._message.detail[0];
          }

          return of(verificationFailed(message));
        })
      );
    })
  );

export const readToken = async () => {
  const token = await AfridioAsyncStoreService.getToken();

  return { token: token };
};

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
  startVerification,
  verificationFailed,
  resetAuthError,
  resetRegError,
} = authSlice.actions;

export default authSlice.reducer;
