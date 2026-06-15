import type { FormEvent } from 'react'
import { assetPaths } from '../lib/assetPaths'

interface LoginPageProps {
  username: string
  password: string
  error: string | null
  isSubmitting: boolean
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function LoginPage({
  username,
  password,
  error,
  isSubmitting,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginPageProps) {
  return (
    <div className="relative flex h-full min-h-dvh items-center justify-center overflow-hidden">
      <img
        src={assetPaths.images.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover -z-10"
        fetchPriority="high"
      />

      <div className="w-full max-w-md rounded-xl bg-[#701e11]/95 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="font-supreme-extrabold m-0 text-center text-2xl text-white">
          Lucky Cup Admin
        </h1>
        <p className="font-supreme-regular mt-2 mb-6 text-center text-sm text-white/70">
          Sign in to continue
        </p>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="font-supreme-regular text-xs text-[#ff9585]">Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => onUsernameChange(event.target.value)}
              className="rounded-lg border border-[#963c2e] bg-[#4a1209] px-3 py-2 font-ui text-sm text-white outline-none focus:border-[#ff9585]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-supreme-regular text-xs text-[#ff9585]">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              className="rounded-lg border border-[#963c2e] bg-[#4a1209] px-3 py-2 font-ui text-sm text-white outline-none focus:border-[#ff9585]"
            />
          </label>

          {error ? (
            <p className="font-supreme-regular m-0 text-center text-lg  text-[#e61d25]">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-povlar mt-2 cursor-pointer rounded-full border-0 bg-[#e61d25] px-6 py-3 text-sm text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
