
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { gql } from '@apollo/client';

export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchBookmark',
  async (_, { getState }) => {
    const GET_BOOKMARKS = gql`
      query GetBookmarks {
        bookmarks {
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
      query: GET_BOOKMARKS,
      fetchPolicy: 'network-only'
    });

    const movies = [];
    const tvSeries = [];
    response.data.bookmarks.forEach(item => {
      if (item.media_type === 'movie' || item.release_date) {
        movies.push(item);
      } else {
        tvSeries.push(item);
      }
    });

    return { movies, tvSeries };
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    data: { movies: [], tvSeries: [] },
    status: 'idle',
    error: null,
  },
  reducers: {
    removeBookmarkMovie(state, action) {
      state.data.movies = state.data.movies.filter(item => item.id !== action.payload);
    },
    removeBookmarkTVSeries(state, action) {
      state.data.tvSeries = state.data.tvSeries.filter(item => item.id !== action.payload);
    },
    addBookmark(state, action) {
      const item = action.payload;
      if (item.media_type === 'movie') {
        state.data.movies.push(item);
      } else {
        state.data.tvSeries.push(item);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { removeBookmarkMovie, removeBookmarkTVSeries, addBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;