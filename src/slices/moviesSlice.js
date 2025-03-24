// moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { gql } from '@apollo/client';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (cursor) => {
  const GET_MOVIES = gql`
    query GetMovies($first: Int, $after: String) {
      movies(first: $first, after: $after) {
        edges {
          node {
            id
            title
            name
            backdrop_path
            poster_path
            release_date
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
    query: GET_MOVIES,
    variables: { 
      first: 20, // Number of items per page
      after: cursor 
    },
    fetchPolicy: 'network-only'
  });

  return {
    edges: response.data.movies.edges,
    pageInfo: response.data.movies.pageInfo
  };
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    cursor: null,
    hasMore: true,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Map edges to nodes and add to movies array
        const newMovies = action.payload.edges.map(edge => edge.node);
        state.movies = [...state.movies, ...newMovies];
        state.cursor = action.payload.pageInfo.endCursor;
        state.hasMore = action.payload.pageInfo.hasNextPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;