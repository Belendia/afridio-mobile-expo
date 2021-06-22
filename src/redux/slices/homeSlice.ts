import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import AfridioApiService from "../../services/network/AfridioApiService";
import { Action } from "../rootReducer";
import { Media } from "../../../types";

type HomeMedia = {
  id: string;
  title: string;
  medias: Media[];
};

type HomeReducerType = {
  featuredMedias: HomeMedia[] | null;
  nonFeaturedMedias: HomeMedia[] | null;
  error: object | null;
  loading: boolean;
};

const initialState: HomeReducerType = {
  featuredMedias: null,
  nonFeaturedMedias: null,
  error: null,
  loading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    startToGetHomeScreenData: (state) => ({
      ...state,
      loading: true,
    }),
    getHomeScreenDataSuccess: (state, action) => ({
      ...state,
      featuredMedias: action.payload.featured,
      nonFeaturedMedias: action.payload.nonFeatured,
      loading: false,
      error: null,
    }),
    getHomeScreenDataFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const getHomeEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startToGetHomeScreenData.type),
    switchMap(() => {
      return AfridioApiService.home().pipe(
        map((res) => {
          const nonFeaturedMedias = res.filter(
            (item: HomeMedia) => item.title !== "Featured"
          );
          const featuredMedias = res.filter(
            (item: HomeMedia) => item.title === "Featured"
          );
          return getHomeScreenDataSuccess({
            featured: featuredMedias,
            nonFeatured: nonFeaturedMedias,
          });
        }),
        catchError((err) => {
          return of(getHomeScreenDataFailed(err));
        })
      );
    })
  );

export const homeEpics = [getHomeEpic];

export const {
  startToGetHomeScreenData,
  getHomeScreenDataSuccess,
  getHomeScreenDataFailed,
} = homeSlice.actions;

export default homeSlice.reducer;
