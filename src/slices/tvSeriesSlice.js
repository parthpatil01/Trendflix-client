// tvSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTV = createAsyncThunk('tvseries/fetchTV', async (page) => {
 
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/data/tvseries?page=${page}`
    );
    return response.data;
});

const tvSeriesSlice = createSlice({
    name: 'tvseries',
    initialState: {
        series: [],
        page: 1,
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
                state.series = [...state.series, ...action.payload];
                state.hasMore = action.payload.length > 0;
                state.page++;
            })
            .addCase(fetchTV.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default tvSeriesSlice.reducer;
