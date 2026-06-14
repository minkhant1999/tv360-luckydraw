import type { StoredCredentials } from '../types'

const AUTH_STORAGE_KEY = 'lucky-cup-auth'

export function loadAuthFromSession(): StoredCredentials | null {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredCredentials
    if (parsed.authenticated && parsed.token) {
      return parsed
    }
  } catch {
    // ignore invalid storage
  }

  return null
}

export function saveAuthToSession(credentials: StoredCredentials): void {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials))
}

export function clearAuthFromSession(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
