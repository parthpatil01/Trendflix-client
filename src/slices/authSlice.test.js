import { describe, it, expect, beforeEach, vi } from 'vitest';
import authReducer, { signIn, signOut } from './authSlice';

describe('authSlice', () => {
  let mockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = mockLocalStorage;
  });

  describe('initializeStateFromStorage', () => {
    it('should initialize with unauthenticated state when no token exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const state = authReducer(undefined, { type: '@@INIT' });

      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
    });

    it('should handle null userData gracefully', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return null;
        if (key === 'userData') return null;
        return null;
      });

      const state = authReducer(undefined, { type: '@@INIT' });

      expect(state.isAuthenticated).toBe(false);
      expect(state.userData).toBeNull();
    });
  });

  describe('signIn action', () => {
    it('should set authenticated state and save to localStorage', () => {
      const initialState = {
        isAuthenticated: false,
        userData: null,
      };

      const payload = {
        token: 'new-token',
        data: { id: 1, email: 'user@example.com', name: 'Test User' },
      };

      const newState = authReducer(initialState, signIn(payload));

      expect(newState.isAuthenticated).toBe(true);
      expect(newState.userData).toEqual(payload.data);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'new-token');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'userData',
        JSON.stringify(payload.data)
      );
    });

    it('should update state when already authenticated', () => {
      const initialState = {
        isAuthenticated: true,
        userData: { id: 1, email: 'old@example.com' },
      };

      const payload = {
        token: 'updated-token',
        data: { id: 2, email: 'new@example.com', name: 'New User' },
      };

      const newState = authReducer(initialState, signIn(payload));

      expect(newState.isAuthenticated).toBe(true);
      expect(newState.userData).toEqual(payload.data);
      expect(newState.userData.email).toBe('new@example.com');
    });

    it('should handle minimal user data', () => {
      const initialState = {
        isAuthenticated: false,
        userData: null,
      };

      const payload = {
        token: 'minimal-token',
        data: { id: 1 },
      };

      const newState = authReducer(initialState, signIn(payload));

      expect(newState.isAuthenticated).toBe(true);
      expect(newState.userData).toEqual({ id: 1 });
    });
  });

  describe('signOut action', () => {
    it('should clear authenticated state and remove from localStorage', () => {
      const initialState = {
        isAuthenticated: true,
        userData: { id: 1, email: 'user@example.com' },
      };

      const newState = authReducer(initialState, signOut());

      expect(newState.isAuthenticated).toBe(false);
      expect(newState.userData).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userData');
    });

    it('should handle signOut when already unauthenticated', () => {
      const initialState = {
        isAuthenticated: false,
        userData: null,
      };

      const newState = authReducer(initialState, signOut());

      expect(newState.isAuthenticated).toBe(false);
      expect(newState.userData).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined action', () => {
      const initialState = {
        isAuthenticated: false,
        userData: null,
      };

      const newState = authReducer(initialState, { type: 'UNKNOWN_ACTION' });

      expect(newState).toEqual(initialState);
    });

    it('should maintain immutability', () => {
      const initialState = {
        isAuthenticated: false,
        userData: null,
      };

      const payload = {
        token: 'test-token',
        data: { id: 1, email: 'test@example.com' },
      };

      authReducer(initialState, signIn(payload));

      expect(initialState.isAuthenticated).toBe(false);
      expect(initialState.userData).toBeNull();
    });
  });
});
