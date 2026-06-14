import { type FormEvent, useCallback, useState } from 'react'
import { useLoginMutation } from '../store/api/luckyDrawApi'
import { clearCredentials, selectIsAuthenticated, setCredentials } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import LoginPage from './LoginPage'

interface AuthGateProps {
  children: React.ReactNode
}

function AuthGate({ children }: AuthGateProps) {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [login] = useLoginMutation()

  const handleLogin = useCallback(
    async (credentials: { username: string; password: string }) => {
      const response = await login(credentials).unwrap()
      const { result } = response

      if (!result.authenticated || !result.token) {
        throw new Error(result.message || 'Login failed')
      }

      dispatch(
        setCredentials({
          username: result.username || credentials.username,
          token: result.token,
          authenticated: true,
        }),
      )
    },
    [dispatch, login],
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await handleLogin({ username, password })
    } catch {
      dispatch(clearCredentials())
      setError('Invalid username or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated) {
    return children
  }

  return (
    <LoginPage
      username={username}
      password={password}
      error={error}
      isSubmitting={isSubmitting}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  )
}

export default AuthGate
