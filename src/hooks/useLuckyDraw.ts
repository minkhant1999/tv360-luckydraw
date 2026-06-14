import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { initialWinners } from '../data/winners'
import {
  participants as defaultParticipants,
  parseParticipantsFromText,
} from '../data/participants'
import type {
  DrawPhase,
  Participant,
  Reward,
  RewardId,
  Winner,
  WinnerType,
} from '../types'
import { normalizePhoneDigits } from '../utils/normalizePhoneDigits'

const DIGIT_COUNT = 9
const MASK = 'x'.repeat(DIGIT_COUNT)
const SPIN_MIN_MS = 7000
const SPIN_MAX_MS = 10000
const REVEAL_INTERVAL_MS = 450

function randomDigit(): string {
  return String(Math.floor(Math.random() * 10))
}

function randomSpinDisplay(): string {
  return Array.from({ length: DIGIT_COUNT }, randomDigit).join('')
}

function randomSpinDuration(): number {
  return SPIN_MIN_MS + Math.floor(Math.random() * (SPIN_MAX_MS - SPIN_MIN_MS + 1))
}

export function useLuckyDraw(selectedReward: Reward) {
  const [phase, setPhase] = useState<DrawPhase>('idle')
  const [display, setDisplay] = useState(MASK)
  const [winnerIsdn, setWinnerIsdn] = useState<string | null>(null)
  const [winner, setWinner] = useState<Participant | null>(null)
  const [revealedCount, setRevealedCount] = useState(0)
  const [participantPool, setParticipantPool] = useState<Participant[]>(defaultParticipants)
  const [winners, setWinners] = useState<Winner[]>(initialWinners)
  const [rewardsState, setRewardsState] = useState<Partial<Record<RewardId, number>> | null>(null)

  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const revealIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimers = useCallback(() => {
    if (spinTimerRef.current) {
      clearTimeout(spinTimerRef.current)
      spinTimerRef.current = null
    }
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current)
      spinIntervalRef.current = null
    }
    if (revealIntervalRef.current) {
      clearInterval(revealIntervalRef.current)
      revealIntervalRef.current = null
    }
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const startDraw = useCallback((isdn: string) => {
    if (!selectedReward || phase === 'spinning' || phase === 'revealing') return

    const phone = normalizePhoneDigits(isdn)
    if (phone.length !== DIGIT_COUNT) return

    clearTimers()
    setRevealedCount(0)
    setWinnerIsdn(isdn)
    setWinner({ id: Date.now(), phone, rewardId: selectedReward.id })
    setPhase('spinning')
    setDisplay(randomSpinDisplay())

    spinIntervalRef.current = setInterval(() => {
      setDisplay(randomSpinDisplay())
    }, 80)

    spinTimerRef.current = setTimeout(() => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current)
        spinIntervalRef.current = null
      }

      setPhase('revealing')
      setDisplay(MASK)
      setRevealedCount(0)

      let revealed = 0

      revealIntervalRef.current = setInterval(() => {
        revealed += 1
        const maskLength = DIGIT_COUNT - revealed
        const revealedPart = phone.slice(-revealed)
        const maskedPart = 'x'.repeat(maskLength)
        setDisplay(maskedPart + revealedPart)
        setRevealedCount(revealed)

        if (revealed >= DIGIT_COUNT) {
          if (revealIntervalRef.current) {
            clearInterval(revealIntervalRef.current)
            revealIntervalRef.current = null
          }
          setPhase('complete')

          const newWinner: Winner = {
            id: Date.now(),
            type: (selectedReward.prizeType ?? 'WEEKLY') as WinnerType,
            prizeName: selectedReward.name,
            prizeImage: selectedReward.image,
            phone,
          }
          setWinners((prev) => [newWinner, ...prev])

          setRewardsState((prev) => {
            const base = prev ?? {}
            const current = base[selectedReward.id] ?? selectedReward.drawn
            return { ...base, [selectedReward.id]: current + 1 }
          })
        }
      }, REVEAL_INTERVAL_MS)
    }, randomSpinDuration())
  }, [phase, clearTimers, selectedReward])

  const resetDraw = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setDisplay(MASK)
    setWinnerIsdn(null)
    setWinner(null)
    setRevealedCount(0)
  }, [clearTimers])

  const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result
      if (typeof text !== 'string') return
      const parsed = parseParticipantsFromText(text)
      if (parsed.length > 0) {
        setParticipantPool(parsed)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }, [])

  const exportWinners = useCallback(() => {
    const header = 'NO,PRIZE,PHONE NUMBER\n'
    const rows = winners
      .map((w, i) => `${i + 1},"${w.prizeName}",09${w.phone}`)
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'winners.csv'
    link.click()
    URL.revokeObjectURL(url)
  }, [winners])

  const getDrawnCount = useCallback(
    (rewardId: RewardId, defaultDrawn: number) => rewardsState?.[rewardId] ?? defaultDrawn,
    [rewardsState],
  )

  return {
    phase,
    display,
    winnerIsdn,
    winner,
    revealedCount,
    winners,
    startDraw,
    resetDraw,
    handleFileUpload,
    exportWinners,
    getDrawnCount,
    isDrawing: phase === 'spinning' || phase === 'revealing',
  }
}
