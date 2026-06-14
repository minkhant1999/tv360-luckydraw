import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, StoredCredentials } from '../types'

const AUTH_STORAGE_KEY = 'lucky-cup-auth'

function loadStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { username: null, token: null, authenticated: false }

    const parsed = JSON.parse(raw) as StoredCredentials
    if (parsed.authenticated && parsed.token) {
      return {
        username: parsed.username,
        token: parsed.token,
        authenticated: true,
      }
    }
  } catch {
    // ignore invalid storage
  }

  return { username: null, token: null, authenticated: false }
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
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload))
    },
    clearCredentials: (state) => {
      state.username = null
      state.token = null
      state.authenticated = false
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.authenticated && Boolean(state.auth.token)

export default authSlice.reducer
