import type { Participant, RewardId } from '../types'

export const participants: Participant[] = [
  { id: 1, phone: '9661234951', rewardId: 'jersey-player' },
  { id: 2, phone: '9772345678', rewardId: 'jersey-player' },
  { id: 3, phone: '9883456789', rewardId: 'cash-500k' },
  { id: 4, phone: '9994567890', rewardId: 'cash-500k' },
  { id: 5, phone: '9115678901', rewardId: 'cash-100k' },
  { id: 6, phone: '9226789012', rewardId: 'cash-100k' },
  { id: 7, phone: '9337890123', rewardId: 'cash-100k' },
  { id: 8, phone: '9448901234', rewardId: 'tv360-jersey' },
  { id: 9, phone: '9559012345', rewardId: 'tv360-jersey' },
  { id: 10, phone: '9660123456', rewardId: 'jersey-player' },
]

export function pickRandomWinner(
  pool: Participant[],
  rewardId?: RewardId | string | null,
): Participant | null {
  const filtered = rewardId
    ? pool.filter((p) => p.rewardId === rewardId)
    : pool
  if (filtered.length === 0) return null
  const index = Math.floor(Math.random() * filtered.length)
  return filtered[index] ?? null
}

export function parseParticipantsFromText(text: string): Participant[] {
  const lines = text.split(/\r?\n/).filter(Boolean)
  const parsed: Participant[] = []

  lines.forEach((line, index) => {
    const cols = line.split(/[,\t;]/).map((c) => c.trim())
    const phoneRaw = cols.find((c) => /\d{9,11}/.test(c.replace(/\D/g, '')))
    if (!phoneRaw) return

    const digits = phoneRaw.replace(/\D/g, '')
    const phone = digits.startsWith('09')
      ? digits.slice(2)
      : digits.startsWith('9') && digits.length >= 9
        ? digits.slice(-9)
        : digits.slice(0, 9)

    if (phone.length !== 9) return

    parsed.push({
      id: Date.now() + index,
      phone,
      rewardId: cols[1] || null,
    })
  })

  return parsed
}
