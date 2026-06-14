import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, StoredCredentials } from '../types'

const AUTH_STORAGE_KEY = 'lucky-cup-basic-auth'


function loadStoredCredentials(): Pick<AuthState, 'username' | 'password'> {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { username: null, password: null }
    const parsed = JSON.parse(raw) as StoredCredentials
    if (parsed.username && parsed.password) {
      return { username: parsed.username, password: parsed.password }
    }
  } catch {
    // ignore invalid storage
  }
  return { username: null, password: null }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadStoredCredentials(),
  reducers: {
    setCredentials: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.username = action.payload.username
      state.password = action.payload.password
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload))
    },
    clearCredentials: (state) => {
      state.username = null
      state.password = null
      localStorage.removeItem(AUTH_STORAGE_KEY)
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.username && state.auth.password)

export default authSlice.reducer
