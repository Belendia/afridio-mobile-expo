import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import AfridioAsyncStoreService from "../../services/asyncstorage/AfridioAsyncStoreService";
import AfridioApiService from "../../services/network/AfridioApiService";
import { Action } from "../rootReducer";

type RegistrationReducerType = {
  error: object | null;
  registering: boolean;
  registered: boolean;
  verifying: boolean;
  password: string | null;
};

const initialState: RegistrationReducerType = {
  error: null,
  registering: false,
  registered: false,
  verifying: false,
  password: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
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
    startVerification: (state) => ({
      ...state,
      verifying: true,
    }),
    verificationSuccess: (state, action) => ({
      ...state,
      token: action.payload.token,
      error: null,
      verifying: false,
    }),
    verificationFailed: (state, action) => ({
      ...state,
      error: action.payload,
      verifying: false,
    }),
    resetError: (state) => ({
      ...state,
      error: null,
    }),
  },
});

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
          return verificationSuccess(res);
        }),
        catchError((err) => {
          return of(verificationFailed(err));
        })
      );
    })
  );

export const registrationEpics = [registerEpic, verifyEpic];

export const {
  startRegistration,
  registrationSuccess,
  registrationFailed,
  startVerification,
  verificationSuccess,
  verificationFailed,
  resetError,
} = registrationSlice.actions;

export default registrationSlice.reducer;
