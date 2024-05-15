// slices/bookmarkSlice.js
import makeRequestWithToken from '../helper/makeRequestWithToken';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchBookmarks = createAsyncThunk(
    'bookmark/fetchBookmark',
    async (email) => {
        const response = await makeRequestWithToken(
            "/media/get-bookmarks",
            'POST',
            { email: email }
        );

        const movies = [];
        const tvSeries = [];
        response.data.forEach(item => {
            if (item.release_date) {
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
        data: {},
        status: 'idle',
        error: null,
    },

    reducers: {
        removeBookmarkMovie(state, action) {
            const itemId = action.payload;
            state.data.movies = state.data.movies.filter(item => item.id !== itemId);
        },
        removeBookmarkTVSeries(state, action) {
            const itemId = action.payload;
            state.data.tvSeries = state.data.tvSeries.filter(item => item.id !== itemId);
        },
        // Other reducers...
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

export const { removeBookmarkMovie, removeBookmarkTVSeries } = bookmarkSlice.actions;


export default bookmarkSlice.reducer;
