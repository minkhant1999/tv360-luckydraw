import { useCallback, useEffect, useMemo, useState } from 'react'
import { assetPaths } from './lib/assetPaths'
import { ErrorPopUp } from './common/ErrorPopUp'
import CongratulationsModal from './components/CongratulationsModal'
import Footer from './components/Footer'
import Header from './components/Header'
import RewardsList from './components/RewardsList'
import Tagline from './components/Tagline'
import WinnerPanel from './components/WinnerPanel'
import WinnersTable from './components/WinnersTable'
import { rewards as fallbackRewards } from './data/rewards'
import { useLuckyDraw } from './hooks/useLuckyDraw'
import { loadAppSession, getDrawnCountsForPrizeType, getDrawnCountsKey, saveAppSession } from './lib/appSessionStorage'
import { luckyDrawApi, useGetPrizesQuery } from './store/api/luckyDrawApi'
import { useAppDispatch } from './store/hooks'
import type { RewardId, SelectWinnerResult, WinnerType } from './types'
import { mapPrizesToRewards } from './utils/mapPrizesToRewards'
import { parseApiError, type PopUpError } from './utils/parseApiError'

function App() {
  const dispatch = useAppDispatch()
  const [session, setSession] = useState(loadAppSession)
  const [drawResult, setDrawResult] = useState<SelectWinnerResult | null>(null)
  const [isCongratsOpen, setIsCongratsOpen] = useState(false)
  const [isSelectingWinner, setIsSelectingWinner] = useState(false)
  const [isPrizesErrorDismissed, setIsPrizesErrorDismissed] = useState(false)

  const isRewardsEnabled =
    session.prizeType === 'WEEKLY' ? session.weeklyUploaded : session.grandUploaded

  const {
    data: prizesResponse,
    isLoading: isPrizesLoading,
    error: prizesQueryError,
    isError: isPrizesError,
  } = useGetPrizesQuery(
    { prizeType: session.prizeType },
    { skip: !isRewardsEnabled },
  )

  useEffect(() => {
    setIsPrizesErrorDismissed(false)
  }, [session.prizeType, isRewardsEnabled])

  const prizesPopUpError = useMemo((): PopUpError | null => {
    if (!isRewardsEnabled || isPrizesErrorDismissed) return null

    if (isPrizesError && prizesQueryError) {
      return parseApiError(prizesQueryError)
    }

    if (prizesResponse && !prizesResponse.success) {
      return {
        code: prizesResponse.code ?? 'Error',
        message: prizesResponse.message ?? 'Failed to load prizes.',
      }
    }

    return null
  }, [
    isRewardsEnabled,
    isPrizesErrorDismissed,
    isPrizesError,
    prizesQueryError,
    prizesResponse,
  ])

  const apiRewards = useMemo(() => {
    if (!prizesResponse?.success) return []
    return mapPrizesToRewards(prizesResponse.result)
  }, [prizesResponse])

  const rewards = useMemo(
    () => (apiRewards.length > 0 ? apiRewards : fallbackRewards),
    [apiRewards],
  )

  useEffect(() => {
    setSession((current) => {
      if (rewards.some((reward) => reward.id === current.selectedRewardId)) {
        return current
      }

      const next = {
        ...current,
        selectedRewardId: rewards[0]?.id ?? current.selectedRewardId,
      }
      saveAppSession(next)
      return next
    })
  }, [rewards])

  const selectedReward = useMemo(
    () => rewards.find((r) => r.id === session.selectedRewardId) ?? rewards[0],
    [rewards, session.selectedRewardId],
  )

  const drawnCounts = useMemo(
    () => getDrawnCountsForPrizeType(session),
    [session],
  )

  const getDrawnCount = useCallback(
    (rewardId: RewardId, defaultDrawn: number) => drawnCounts[rewardId] ?? defaultDrawn,
    [drawnCounts],
  )

  const handleDrawComplete = useCallback(
    (rewardId: RewardId) => {
      setSession((current) => {
        const countsKey = getDrawnCountsKey(current.prizeType)
        const currentCounts = current[countsKey]
        const base =
          currentCounts[rewardId] ??
          rewards.find((reward) => reward.id === rewardId)?.drawn ??
          0
        const next = {
          ...current,
          [countsKey]: {
            ...currentCounts,
            [rewardId]: base + 1,
          },
        }
        saveAppSession(next)
        return next
      })
    },
    [rewards],
  )

  const {
    phase,
    display,
    winnerIsdn,
    startDraw,
    resetDraw,
    isDrawing,
  } = useLuckyDraw(selectedReward, handleDrawComplete)

  const handleSelectWinner = useCallback(
    (result: SelectWinnerResult) => {
      setDrawResult(result)
      startDraw(result.isdn)
    },
    [startDraw],
  )

  useEffect(() => {
    if (phase === 'complete' && drawResult) {
      setIsCongratsOpen(true)
    }
  }, [phase, drawResult])

  const handleCloseCongrats = useCallback(() => {
    setIsCongratsOpen(false)
    setDrawResult(null)
    resetDraw()
    dispatch(luckyDrawApi.util.invalidateTags(['History']))
  }, [resetDraw, dispatch])

  const rewardsWithCounts = useMemo(
    () =>
      rewards.map((reward) => ({
        ...reward,
        drawn: getDrawnCount(reward.id, reward.drawn),
      })),
    [rewards, getDrawnCount],
  )

  const handleSelectReward = useCallback((rewardId: RewardId) => {
    setSession((current) => {
      const next = { ...current, selectedRewardId: rewardId }
      saveAppSession(next)
      return next
    })
  }, [])

  const handleImportSuccess = useCallback(() => {
    setSession((current) => {
      const next =
        current.prizeType === 'WEEKLY'
          ? { ...current, weeklyUploaded: true }
          : { ...current, grandUploaded: true }
      saveAppSession(next)
      return next
    })
  }, [])

  const handlePrizeTypeChange = useCallback((prizeType: WinnerType) => {
    setSession((current) => {
      const next = {
        ...current,
        prizeType,
        grandUploaded: prizeType === 'GRAND' ? false : current.grandUploaded,
      }
      saveAppSession(next)
      return next
    })
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col relative overflow-hidden">
      <img
        src={assetPaths.images.background}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
        fetchPriority="high"
      />

      <Header />
      <Tagline />

      <main className="flex min-h-0 flex-1 items-start justify-center gap-6 px-[90px] py-[clamp(0.5rem,2vh,1.5625rem)] max-[1200px]:gap-4 max-[1200px]:px-8">
        <RewardsList
          className="h-[430px]"
          rewards={rewardsWithCounts}
          selectedRewardId={session.selectedRewardId}
          onSelectReward={handleSelectReward}
          disableSelect={!isRewardsEnabled || isPrizesLoading || isDrawing || isSelectingWinner}
          isLoading={isPrizesLoading}
        />
        <WinnerPanel
          selectedReward={selectedReward}
          display={display}
          phase={phase}
          winnerIsdn={winnerIsdn}
          isDrawing={isDrawing}
          isRewardsEnabled={isRewardsEnabled && !isPrizesLoading}
          onSelectWinner={handleSelectWinner}
          onImportSuccess={handleImportSuccess}
          onSelectingWinnerChange={setIsSelectingWinner}
        />
        <WinnersTable
          className="h-[400px]"
          prizeType={session.prizeType}
          onPrizeTypeChange={handlePrizeTypeChange}
        />
      </main>

      <Footer />

      <CongratulationsModal
        open={isCongratsOpen}
        onClose={handleCloseCongrats}
        result={drawResult}
      />

      <ErrorPopUp
        error={prizesPopUpError}
        onClose={() => setIsPrizesErrorDismissed(true)}
      />
    </div>
  )
}

export default App
