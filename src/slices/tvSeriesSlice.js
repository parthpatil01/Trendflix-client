// slices/tvSeriesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTVSeries = createAsyncThunk(
  'tvseries/fetchTVSeries',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/data/tvseries`
    );
    return response.data;
  }
);

const tvSeriesSlice = createSlice({
  name: 'tvseries',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVSeries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTVSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTVSeries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default tvSeriesSlice.reducer;
