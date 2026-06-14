import type { RewardId, WinnerType } from '../types'

const APP_SESSION_KEY = 'lucky-cup-app'

export type DrawnCounts = Partial<Record<RewardId, number>>

export interface AppSessionState {
  prizeType: WinnerType
  weeklyUploaded: boolean
  grandUploaded: boolean
  selectedRewardId: RewardId
  weeklyDrawnCounts: DrawnCounts
  grandDrawnCounts: DrawnCounts
}

const DEFAULT_APP_SESSION: AppSessionState = {
  prizeType: 'WEEKLY',
  weeklyUploaded: false,
  grandUploaded: false,
  selectedRewardId: 'jersey-player',
  weeklyDrawnCounts: {},
  grandDrawnCounts: {},
}

function isWinnerType(value: unknown): value is WinnerType {
  return value === 'WEEKLY' || value === 'GRAND'
}

function isRewardId(value: unknown): value is RewardId {
  return (
    value === 'jersey-player' ||
    value === 'cash-500k' ||
    value === 'cash-100k' ||
    value === 'tv360-jersey'
  )
}

function parseDrawnCounts(value: unknown): DrawnCounts {
  if (!value || typeof value !== 'object') return {}

  const counts: DrawnCounts = {}
  for (const [key, drawn] of Object.entries(value)) {
    if (isRewardId(key) && typeof drawn === 'number' && drawn >= 0) {
      counts[key] = drawn
    }
  }
  return counts
}

export function loadAppSession(): AppSessionState {
  try {
    const raw = sessionStorage.getItem(APP_SESSION_KEY)
    if (!raw) return DEFAULT_APP_SESSION

    const parsed = JSON.parse(raw) as Partial<AppSessionState>
    return {
      prizeType: isWinnerType(parsed.prizeType) ? parsed.prizeType : DEFAULT_APP_SESSION.prizeType,
      weeklyUploaded: Boolean(parsed.weeklyUploaded),
      grandUploaded: Boolean(parsed.grandUploaded),
      selectedRewardId: isRewardId(parsed.selectedRewardId)
        ? parsed.selectedRewardId
        : DEFAULT_APP_SESSION.selectedRewardId,
      weeklyDrawnCounts: parseDrawnCounts(parsed.weeklyDrawnCounts),
      grandDrawnCounts: parseDrawnCounts(parsed.grandDrawnCounts),
    }
  } catch {
    return DEFAULT_APP_SESSION
  }
}

export function saveAppSession(state: AppSessionState): void {
  sessionStorage.setItem(APP_SESSION_KEY, JSON.stringify(state))
}

export function getDrawnCountsForPrizeType(state: AppSessionState): DrawnCounts {
  return state.prizeType === 'WEEKLY' ? state.weeklyDrawnCounts : state.grandDrawnCounts
}

export function getDrawnCountsKey(prizeType: WinnerType): 'weeklyDrawnCounts' | 'grandDrawnCounts' {
  return prizeType === 'WEEKLY' ? 'weeklyDrawnCounts' : 'grandDrawnCounts'
}
