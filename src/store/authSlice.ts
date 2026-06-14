import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { clearAuthFromSession, loadAuthFromSession, saveAuthToSession } from '../lib/authStorage'
import type { AuthState } from '../types'

function loadStoredAuth(): AuthState {
  const stored = loadAuthFromSession()
  if (!stored) {
    return { username: null, token: null, authenticated: false }
  }

  return {
    username: stored.username,
    token: stored.token,
    authenticated: true,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadStoredAuth(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; token: string; authenticated: boolean }>,
    ) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.authenticated = action.payload.authenticated
      saveAuthToSession(action.payload)
    },
    clearCredentials: (state) => {
      state.username = null
      state.token = null
      state.authenticated = false
      clearAuthFromSession()
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.authenticated && Boolean(state.auth.token)

export default authSlice.reducer
