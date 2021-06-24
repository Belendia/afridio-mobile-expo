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
  error: object | null;
  loading: boolean;
};

const initialState: MediaReducerType = {
  media: null,
  error: null,
  loading: false,
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

export const mediaEpics = [getMediaEpic];

export const {
  startToGetMedia,
  getMediaSuccess,
  getMediaFailed,
  setMediaLoadingTrue,
} = mediaSlice.actions;

export default mediaSlice.reducer;
