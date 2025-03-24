// tvSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { gql } from '@apollo/client';

export const fetchTV = createAsyncThunk('tvseries/fetchTV', async (cursor) => {
  const GET_TV_SERIES = gql`
    query GetTVSeries($first: Int, $after: String) {
      tvSeries(first: $first, after: $after) {
        edges {
          node {
            id
            name
            backdrop_path
            poster_path
            first_air_date
            media_type
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_TV_SERIES,
    variables: { 
      first: 20, // Number of items per page
      after: cursor 
    },
    fetchPolicy: 'network-only'
  });

  return {
    edges: response.data.tvSeries.edges,
    pageInfo: response.data.tvSeries.pageInfo
  };
});

const tvSeriesSlice = createSlice({
  name: 'tvseries',
  initialState: {
    series: [],
    cursor: null,
    hasMore: true,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTV.fulfilled, (state, action) => {
        state.loading = false;
        state.series = [...state.series, ...action.payload.edges.map(edge => edge.node)];
        state.cursor = action.payload.pageInfo.endCursor;
        state.hasMore = action.payload.pageInfo.hasNextPage;
      })
      .addCase(fetchTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tvSeriesSlice.reducer;