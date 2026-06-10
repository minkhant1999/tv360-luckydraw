import prizeJerseyArgentina from '../assets/images/prize-jersey-argentina.webp'
import prizeKyats from '../assets/images/prize-kyats.webp'
import prizeTv360Jersey from '../assets/images/prize-tv360-jersey.webp'
import type { Reward } from '../types'

export const rewards: Reward[] = [
  {
    id: 'jersey-player',
    name: 'Offical Jersey (Player Version)',
    quantity: 1,
    drawn: 0,
    image: prizeJerseyArgentina,
  },
  {
    id: 'cash-500k',
    name: 'Cash 500,000 MMK',
    quantity: 1,
    drawn: 0,
    image: prizeKyats,
  },
  {
    id: 'cash-100k',
    name: 'Cash 100,000 MMK',
    quantity: 10,
    drawn: 0,
    image: prizeKyats,
  },
  {
    id: 'tv360-jersey',
    name: 'TV360 World Cup Jersey',
    quantity: 2,
    drawn: 0,
    image: prizeTv360Jersey,
  },
]
