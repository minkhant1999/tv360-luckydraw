import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetLoginQuery } from '../store/api/luckyDrawApi'
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
  const [isVerifying, setIsVerifying] = useState(isAuthenticated)
  const [triggerLogin] = useLazyGetLoginQuery()
  const hasVerifiedStoredCredentials = useRef(false)

  const verifyLogin = useCallback(async () => {
    await triggerLogin().unwrap()
  }, [triggerLogin])

  useEffect(() => {
    if (!isAuthenticated || hasVerifiedStoredCredentials.current) {
      return
    }

    hasVerifiedStoredCredentials.current = true
    let cancelled = false

    const verifyStoredCredentials = async () => {
      setIsVerifying(true)
      setError(null)

      try {
        await verifyLogin()
      } catch {
        if (!cancelled) {
          dispatch(clearCredentials())
          hasVerifiedStoredCredentials.current = false
          setError('Session expired. Please sign in again.')
        }
      } finally {
        if (!cancelled) {
          setIsVerifying(false)
        }
      }
    }

    void verifyStoredCredentials()

    return () => {
      cancelled = true
    }
  }, [dispatch, isAuthenticated, verifyLogin])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsVerifying(true)

    dispatch(setCredentials({ username, password }))

    try {
      await verifyLogin()
    } catch {
      dispatch(clearCredentials())
      setError('Invalid username or password.')
    } finally {
      setIsVerifying(false)
    }
  }

  if (isAuthenticated && !isVerifying) {
    return children
  }

  return (
    <LoginPage
      username={username}
      password={password}
      error={error}
      isSubmitting={isVerifying}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  )
}

export default AuthGate
