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

export type WinnerType = 'weekly' | 'grand'

export interface Winner {
  id: number
  type: WinnerType
  prizeName: string
  prizeImage: string
  phone: string
}

export type DrawPhase = 'idle' | 'spinning' | 'revealing' | 'complete'
