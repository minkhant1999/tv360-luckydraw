import { assetPaths } from '../lib/assetPaths'
import type { Reward } from '../types'

const { prizeJerseyArgentina, prizeKyats, prizeTv360Jersey } = assetPaths.images

export const rewards: Reward[] = [
  {
    id: 'jersey-player',
    name: 'Offical Jersey (Player Version)',
    quantity: 1,
    drawn: 0,
    image: prizeJerseyArgentina,
    prizeCode: 'OFFICIAL_JERSEY',
    prizeType: 'WEEKLY',
    initialQuantity:100,
  },
  {
    id: 'cash-500k',
    name: 'Cash 500,000 MMK',
    quantity: 1,
    drawn: 0,
    image: prizeKyats,
    prizeCode: 'FIVE_LAKHS',
    prizeType: 'WEEKLY',
    initialQuantity:100,

  },
  {
    id: 'cash-100k',
    name: 'Cash 100,000 MMK',
    quantity: 10,
    drawn: 0,
    image: prizeKyats,
    prizeCode: 'ONE_LAKH',
    prizeType: 'WEEKLY',
    initialQuantity:100,

  },
  {
    id: 'tv360-jersey',
    name: 'TV360 World Cup Jersey',
    quantity: 2,
    drawn: 0,
    image: prizeTv360Jersey,
    prizeCode: 'TV360_JERSEY',
    prizeType: 'WEEKLY',
    initialQuantity:100,

  },
]
