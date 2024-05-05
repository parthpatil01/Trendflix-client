import { createSlice } from '@reduxjs/toolkit';

// Function to initialize state from localStorage
const initializeStateFromStorage = () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    return {
        isAuthenticated: !!token,
        userData: userData ? userData : null,
    };
};

const initialState = initializeStateFromStorage(); // Initialize state from localStorage

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const { token, data } = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(data)); // Store userData in localStorage
            state.isAuthenticated = true;
            state.userData = data;
        },
        signOut: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userData'); // Remove userData from localStorage
            state.isAuthenticated = false;
            state.userData = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
