import prizeJerseyArgentina from '../assets/images/prize-jersey-argentina.webp'
import prizeKyats from '../assets/images/prize-kyats.webp'
import prizeTv360Jersey from '../assets/images/prize-tv360-jersey.webp'
import type { Prize, Reward, RewardId } from '../types'

const PRIZE_CONFIG: Record<string, { id: RewardId; image: string }> = {
  OFFICIAL_JERSEY: { id: 'jersey-player', image: prizeJerseyArgentina },
  FIVE_LAKHS: { id: 'cash-500k', image: prizeKyats },
  ONE_LAKH: { id: 'cash-100k', image: prizeKyats },
  TV360_JERSEY: { id: 'tv360-jersey', image: prizeTv360Jersey },
}

export function mapPrizeToReward(prize: Prize, drawn = 0): Reward | null {
  const config = PRIZE_CONFIG[prize.prizeCode]
  if (!config) return null

  return {
    id: config.id,
    name: prize.prizeName,
    quantity: prize.quantity,
    drawn,
    image: config.image,
  }
}

export function mapPrizesToRewards(prizes: Prize[]): Reward[] {
  return prizes
    .map((prize) => mapPrizeToReward(prize))
    .filter((reward): reward is Reward => reward !== null)
}
