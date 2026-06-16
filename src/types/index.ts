export type RewardId =
  | "jersey-player"
  | "cash-500k"
  | "cash-100k"
  | "tv360-jersey"
  | "cash-300k"
  | "cash-1M"
  | "gold"

export interface Reward {
  id: RewardId
  name: string
  quantity: number
  drawn: number
  image: string
  prizeCode?: string
  prizeType?: WinnerType
  initialQuantity: number
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

export interface HistoryResponse {
  code: string
  message: string
  result: History[]
  success: boolean
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

export interface Prize {
  id: number
  prizeName: string
  quantity: number
  initialQuantity?: number
  prizeType: WinnerType
  prizeCode: string
}

export interface PrizesResponse {
  code: string
  message: string
  result: Prize[]
  success: boolean
}

export interface SelectWinnerResult {
  prizeName: string
  prizeCode: string
  prizeType: WinnerType
  isdn: string
  winnerName: string
  remainingQuantity: number
}

export interface SelectWinnerResponse {
  code: string
  message: string
  result: SelectWinnerResult
  success: boolean
}

export interface ImportUsersResult {
  totalRows: number
  imported: number
  skippedDuplicates: number
  skippedInvalid: number
  validationErrors: string[]
}

export interface ImportUsersResponse {
  code: string
  message: string
  result: ImportUsersResult
  success: boolean
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
