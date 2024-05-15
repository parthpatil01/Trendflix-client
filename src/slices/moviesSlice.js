// moviesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (page) => {
 
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/data/movies?page=${page}`
    );
    return response.data;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        page: 1,
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
                state.movies = [...state.movies, ...action.payload];
                state.hasMore = action.payload.length > 0;
                state.page++;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default moviesSlice.reducer;
