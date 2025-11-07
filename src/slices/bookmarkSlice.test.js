import { describe, it, expect, vi } from 'vitest';
import bookmarkReducer, {
  removeBookmarkMovie,
  removeBookmarkTVSeries,
  addBookmark,
  fetchBookmarks,
} from './bookmarkSlice';

describe('bookmarkSlice', () => {
  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = bookmarkReducer(undefined, { type: '@@INIT' });

      expect(state.data).toEqual({ movies: [], tvSeries: [] });
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  describe('removeBookmarkMovie action', () => {
    it('should remove a movie from the movies array', () => {
      const initialState = {
        data: {
          movies: [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' },
            { id: 3, title: 'Movie 3' },
          ],
          tvSeries: [],
        },
        status: 'idle',
        error: null,
      };

      const newState = bookmarkReducer(initialState, removeBookmarkMovie(2));

      expect(newState.data.movies).toHaveLength(2);
      expect(newState.data.movies.find((m) => m.id === 2)).toBeUndefined();
      expect(newState.data.movies).toEqual([
        { id: 1, title: 'Movie 1' },
        { id: 3, title: 'Movie 3' },
      ]);
    });

    it('should not affect movies array if id not found', () => {
      const initialState = {
        data: {
          movies: [{ id: 1, title: 'Movie 1' }],
          tvSeries: [],
        },
        status: 'idle',
        error: null,
      };

      const newState = bookmarkReducer(initialState, removeBookmarkMovie(999));

      expect(newState.data.movies).toHaveLength(1);
      expect(newState.data.movies).toEqual([{ id: 1, title: 'Movie 1' }]);
    });

    it('should handle empty movies array', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      const newState = bookmarkReducer(initialState, removeBookmarkMovie(1));

      expect(newState.data.movies).toHaveLength(0);
      expect(newState.data.movies).toEqual([]);
    });
  });

  describe('removeBookmarkTVSeries action', () => {
    it('should remove a TV series from the tvSeries array', () => {
      const initialState = {
        data: {
          movies: [],
          tvSeries: [
            { id: 1, name: 'Series 1' },
            { id: 2, name: 'Series 2' },
            { id: 3, name: 'Series 3' },
          ],
        },
        status: 'idle',
        error: null,
      };

      const newState = bookmarkReducer(initialState, removeBookmarkTVSeries(2));

      expect(newState.data.tvSeries).toHaveLength(2);
      expect(newState.data.tvSeries.find((s) => s.id === 2)).toBeUndefined();
      expect(newState.data.tvSeries).toEqual([
        { id: 1, name: 'Series 1' },
        { id: 3, name: 'Series 3' },
      ]);
    });

    it('should not affect tvSeries array if id not found', () => {
      const initialState = {
        data: {
          movies: [],
          tvSeries: [{ id: 1, name: 'Series 1' }],
        },
        status: 'idle',
        error: null,
      };

      const newState = bookmarkReducer(initialState, removeBookmarkTVSeries(999));

      expect(newState.data.tvSeries).toHaveLength(1);
      expect(newState.data.tvSeries).toEqual([{ id: 1, name: 'Series 1' }]);
    });
  });

  describe('addBookmark action', () => {
    it('should add a movie to the movies array', () => {
      const initialState = {
        data: {
          movies: [{ id: 1, title: 'Existing Movie' }],
          tvSeries: [],
        },
        status: 'idle',
        error: null,
      };

      const newMovie = { id: 2, title: 'New Movie', media_type: 'movie' };
      const newState = bookmarkReducer(initialState, addBookmark(newMovie));

      expect(newState.data.movies).toHaveLength(2);
      expect(newState.data.movies[1]).toEqual(newMovie);
    });

    it('should add a TV series to the tvSeries array', () => {
      const initialState = {
        data: {
          movies: [],
          tvSeries: [{ id: 1, name: 'Existing Series' }],
        },
        status: 'idle',
        error: null,
      };

      const newSeries = { id: 2, name: 'New Series', media_type: 'tv' };
      const newState = bookmarkReducer(initialState, addBookmark(newSeries));

      expect(newState.data.tvSeries).toHaveLength(2);
      expect(newState.data.tvSeries[1]).toEqual(newSeries);
    });

    it('should add to tvSeries when media_type is not movie', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      const item = { id: 1, name: 'Unknown Type', media_type: 'unknown' };
      const newState = bookmarkReducer(initialState, addBookmark(item));

      expect(newState.data.tvSeries).toHaveLength(1);
      expect(newState.data.movies).toHaveLength(0);
    });

    it('should add to movies array when media_type is explicitly movie', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      const movie = { id: 1, title: 'Test Movie', media_type: 'movie' };
      const newState = bookmarkReducer(initialState, addBookmark(movie));

      expect(newState.data.movies).toHaveLength(1);
      expect(newState.data.tvSeries).toHaveLength(0);
    });
  });

  describe('fetchBookmarks async thunk', () => {
    it('should set status to loading when pending', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      const action = { type: fetchBookmarks.pending.type };
      const newState = bookmarkReducer(initialState, action);

      expect(newState.status).toBe('loading');
    });

    it('should set status to succeeded and update data when fulfilled', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'loading',
        error: null,
      };

      const payload = {
        movies: [{ id: 1, title: 'Movie 1' }],
        tvSeries: [{ id: 2, name: 'Series 1' }],
      };

      const action = { type: fetchBookmarks.fulfilled.type, payload };
      const newState = bookmarkReducer(initialState, action);

      expect(newState.status).toBe('succeeded');
      expect(newState.data).toEqual(payload);
    });

    it('should set status to failed and store error when rejected', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'loading',
        error: null,
      };

      const errorMessage = 'Network error occurred';
      const action = {
        type: fetchBookmarks.rejected.type,
        error: { message: errorMessage },
      };
      const newState = bookmarkReducer(initialState, action);

      expect(newState.status).toBe('failed');
      expect(newState.error).toBe(errorMessage);
    });

    it('should preserve existing data when pending', () => {
      const initialState = {
        data: {
          movies: [{ id: 1, title: 'Existing Movie' }],
          tvSeries: [],
        },
        status: 'idle',
        error: null,
      };

      const action = { type: fetchBookmarks.pending.type };
      const newState = bookmarkReducer(initialState, action);

      expect(newState.data.movies).toEqual([{ id: 1, title: 'Existing Movie' }]);
      expect(newState.status).toBe('loading');
    });
  });

  describe('edge cases', () => {
    it('should handle multiple removes in sequence', () => {
      const initialState = {
        data: {
          movies: [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' },
            { id: 3, title: 'Movie 3' },
          ],
          tvSeries: [],
        },
        status: 'idle',
        error: null,
      };

      let state = bookmarkReducer(initialState, removeBookmarkMovie(1));
      state = bookmarkReducer(state, removeBookmarkMovie(3));

      expect(state.data.movies).toHaveLength(1);
      expect(state.data.movies[0].id).toBe(2);
    });

    it('should handle mixed operations', () => {
      const initialState = {
        data: { movies: [], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      let state = bookmarkReducer(
        initialState,
        addBookmark({ id: 1, title: 'Movie', media_type: 'movie' })
      );
      state = bookmarkReducer(state, addBookmark({ id: 2, name: 'Series', media_type: 'tv' }));
      state = bookmarkReducer(state, removeBookmarkMovie(1));

      expect(state.data.movies).toHaveLength(0);
      expect(state.data.tvSeries).toHaveLength(1);
    });

    it('should maintain immutability', () => {
      const initialState = {
        data: { movies: [{ id: 1, title: 'Movie' }], tvSeries: [] },
        status: 'idle',
        error: null,
      };

      bookmarkReducer(initialState, removeBookmarkMovie(1));

      expect(initialState.data.movies).toHaveLength(1);
    });
  });
});
