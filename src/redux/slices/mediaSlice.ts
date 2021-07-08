import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { parse } from "expo-linking";
import { AVPlaybackStatus } from "expo-av";

import { Media } from "../../../types";
import { Action } from "../rootReducer";
import AfridioApiService from "../../services/network/AfridioApiService";
import { authLogout } from "./authSlice";

type MediaReducerType = {
  media: Media | null;
  mediaListByFormat: Media[];
  selectedTrackIndex: number;
  selectedMediaSlug: string | null;
  error: object | null;
  mediaListByFormatError: object | null;
  loading: boolean;
  loadingList: boolean;
  next: string | null;
  playerState: AVPlaybackStatus | null;
  showMiniPlayer: boolean;
};

const initialState: MediaReducerType = {
  media: null,
  mediaListByFormat: [],
  selectedTrackIndex: -1,
  selectedMediaSlug: null,
  error: null,
  mediaListByFormatError: null,
  loading: false,
  loadingList: false,
  next: null,
  playerState: null,
  showMiniPlayer: false,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    startToGetMedia: (state, _) => ({
      ...state,
      loading: true,
      media: null,
      selectedTrackIndex: -1,
      loadingList: false,
      error: null,
      mediaListByFormatError: null,
    }),
    getMediaSuccess: (state, action) => ({
      ...state,
      media: action.payload.media,
      selectedTrackIndex: action.payload.selectedTrackIndex,
      loading: false,
      error: null,
      mediaListByFormatError: null,
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
      loadingList: true,
      mediaListByFormatError: null,
    }),
    // startToGetMediaListByFormatNextPage: (state, _) => ({
    //   ...state,
    // }),
    getMediaListByFormatSuccess: (state, action) => ({
      ...state,
      mediaListByFormat: [
        ...state.mediaListByFormat,
        ...action.payload.results,
      ],
      next: action.payload.next,
      loadingList: false,
      mediaListByFormatError: null,
    }),
    getMediaListByFormatFailed: (state, action) => ({
      ...state,
      mediaListByFormatError: action.payload,
      loadingList: false,
    }),
    clearMedia: (state) => ({
      ...state,
      media: null,
      mediaListByFormat: [],
      selectedTrackIndex: -1,
    }),
    setTrackIndex: (state, action) => ({
      ...state,
      selectedTrackIndex: action.payload,
    }),
    setMediaSlug: (state, action) => ({
      ...state,
      selectedMediaSlug: action.payload,
    }),
    setPlayerState: (state, action) => ({
      ...state,
      playerState: action.payload,
    }),
    setShowMiniPlayer: (state, action) => ({
      ...state,
      showMiniPlayer: action.payload,
    }),
  },
});

export const getMediaEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetMedia.type),
    switchMap(({ payload: slug }) => {
      return AfridioApiService.media(slug).pipe(
        map((res) => {
          let selectedIndex = -1;
          if (res.tracks && res.tracks.length > 0) {
            selectedIndex = 0;
          }

          return getMediaSuccess({
            media: res,
            selectedTrackIndex: selectedIndex,
          });
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
    switchMap(({ payload }) => {
      const { slug, page } = payload;

      return AfridioApiService.mediaListByFormat(slug, page).pipe(
        map((res) => {
          if (res.next) {
            const url = parse(res.next);
            const r = {
              results: res.results,
              next: url.queryParams["page"],
            };
            return getMediaListByFormatSuccess(r);
          }

          return getMediaListByFormatSuccess(res);
        }),
        catchError((err) => {
          console.log(err);
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
  clearMedia,
  setTrackIndex,
  setMediaSlug,
  setPlayerState,
  setShowMiniPlayer,
} = mediaSlice.actions;

export default mediaSlice.reducer;
