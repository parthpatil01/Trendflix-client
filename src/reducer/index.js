import { combineReducers } from "@reduxjs/toolkit"

import trendingReducer from "../slices/trendingSlice"
import tvseriesReducer from "../slices/tvSeriesSlice"
import moviesReducer from "../slices/moviesSlice"
import authReducer from "../slices/authSlice"
import bookmarkReducer from "../slices/bookmarkSlice"

const rootReducer = combineReducers({
  trending: trendingReducer,
  tvseries: tvseriesReducer,
  movies: moviesReducer,
  auth: authReducer,
  bookmark: bookmarkReducer
})

export default rootReducer
