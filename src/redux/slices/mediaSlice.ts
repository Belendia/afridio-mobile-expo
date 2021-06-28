import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { Media } from "../../../types";
import { Action } from "../rootReducer";
import AfridioApiService from "../../services/network/AfridioApiService";
import { authLogout } from "./authSlice";

type MediaReducerType = {
  media: Media | null;
  mediaListByFormat: Media[] | null;
  error: object | null;
  mediaListByFormatError: object | null;
  loading: boolean;
  next: number | null;
  previous: number | null;
};

const initialState: MediaReducerType = {
  media: null,
  mediaListByFormat: null,
  error: null,
  mediaListByFormatError: null,
  loading: false,
  next: null,
  previous: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    startToGetMedia: (state, _) => ({
      ...state,
      loading: true,
      media: null,
      error: null,
    }),
    getMediaSuccess: (state, action) => ({
      ...state,
      media: action.payload,
      loading: false,
      error: null,
    }),
    getMediaFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      media: null,
    }),
    setMediaLoadingTrue: (state) => ({
      ...state,
      loading: true,
    }),
    startToGetMediaListByFormat: (state, _) => ({
      ...state,
    }),
    getMediaListByFormatSuccess: (state, action) => ({
      ...state,
      mediaListByFormat: action.payload.results,
      next: action.payload.next,
      previous: action.payload.previous,
    }),
    getMediaListByFormatFailed: (state, action) => ({
      ...state,
      mediaListByFormatError: action.payload,
    }),
  },
});

export const getMediaEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetMedia.type),
    switchMap(({ payload: slug }) => {
      return AfridioApiService.media(slug).pipe(
        map((res) => {
          return getMediaSuccess(res);
        }),
        catchError((err) => {
          let message = "Something went wrong";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 401) {
            return of(authLogout("logout"));
          }
          return of(getMediaFailed(message));
        })
      );
    })
  );

export const getMediaListByFormatEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetMediaListByFormat.type),
    switchMap(({ payload: slug }) => {
      return AfridioApiService.mediaListByFormat(slug).pipe(
        map((res) => {
          return getMediaListByFormatSuccess(res);
        }),
        catchError((err) => {
          let message = "Something went wrong";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 401) {
            return of(authLogout("logout"));
          }
          return of(getMediaListByFormatFailed(message));
        })
      );
    })
  );

export const mediaEpics = [getMediaEpic, getMediaListByFormatEpic];

export const {
  startToGetMedia,
  getMediaSuccess,
  getMediaFailed,
  setMediaLoadingTrue,
  startToGetMediaListByFormat,
  getMediaListByFormatSuccess,
  getMediaListByFormatFailed,
} = mediaSlice.actions;

export default mediaSlice.reducer;
