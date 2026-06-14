export type RewardId =
  | 'jersey-player'
  | 'cash-500k'
  | 'cash-100k'
  | 'tv360-jersey'

export interface Reward {
  id: RewardId
  name: string
  quantity: number
  drawn: number
  image: string
}

export interface Participant {
  id: number
  phone: string
  rewardId: RewardId | string | null
}

export type WinnerType = 'WEEKLY' | 'GRAND'

export interface Winner {
  id: number
  type: WinnerType
  prizeName: string
  prizeImage: string
  phone: string
}

export interface History {
  id: number
  type: WinnerType
  prizeName: string
  prizeCode: string
  phoneNumber: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResult {
  username: string
  message: string
  authenticated: boolean
  token: string
}

export interface LoginResponse {
  result: LoginResult
}

export interface StoredCredentials {
  username: string
  token: string
  authenticated: boolean
}

export interface AuthState {
  username: string | null
  token: string | null
  authenticated: boolean
}
export type DrawPhase = 'idle' | 'spinning' | 'revealing' | 'complete'
