// slices/trendingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { gql } from '@apollo/client';

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async () => {
    const GET_TRENDING = gql`
      query GetTrending {
        trending {
          id
          title
          name
          backdrop_path
          poster_path
          release_date
          first_air_date
          media_type
        }
      }
    `;

    const response = await client.query({
      query: GET_TRENDING,
      fetchPolicy: 'network-only'
    });

    return response.data.trending;
  }
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trendingSlice.reducer;