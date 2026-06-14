import { useEffect, useMemo, useState } from 'react'
import backgroundImage from './assets/images/background.webp'
import Footer from './components/Footer'
import Header from './components/Header'
import RewardsList from './components/RewardsList'
import Tagline from './components/Tagline'
import WinnerPanel from './components/WinnerPanel'
import WinnersTable from './components/WinnersTable'
import { rewards as rewardsData } from './data/rewards'
import { useLuckyDraw } from './hooks/useLuckyDraw'
import { useGetPrizesQuery } from './store/api/luckyDrawApi'
import type { RewardId } from './types'
import { mapPrizesToRewards } from './utils/mapPrizesToRewards'

function App() {
  const [selectedRewardId, setSelectedRewardId] = useState<RewardId>(rewardsData[0].id)
  const [isRewardsEnabled, setIsRewardsEnabled] = useState(false)

  const { data: prizesResponse, isLoading: isPrizesLoading } = useGetPrizesQuery(
    { prizeType: 'WEEKLY' },
    { skip: !isRewardsEnabled },
  )

  const apiRewards = useMemo(() => {
    if (!prizesResponse?.success) return []
    return mapPrizesToRewards(prizesResponse.result)
  }, [prizesResponse])

  useEffect(() => {
    if (apiRewards[0]) {
      setSelectedRewardId(apiRewards[0].id)
    }
  }, [apiRewards])

  const selectedReward = useMemo(() => {
    const rewards = apiRewards.length > 0 ? apiRewards : rewardsData
    return rewards.find((r) => r.id === selectedRewardId) ?? rewards[0]
  }, [apiRewards, selectedRewardId])

  const {
    phase,
    display,
    winnerIsdn,
    winners,
    startDraw,
    exportWinners,
    getDrawnCount,
    isDrawing,
  } = useLuckyDraw(selectedReward)

  const rewardsWithCounts = useMemo(() => {
    const rewards = apiRewards.length > 0 ? apiRewards : rewardsData
    return rewards.map((reward) => ({
      ...reward,
      drawn: getDrawnCount(reward.id, reward.drawn),
    }))
  }, [apiRewards, getDrawnCount])

  return (
    <div className="flex h-full min-h-0 flex-col relative overflow-hidden">
      <img
        src={backgroundImage}
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
          selectedRewardId={selectedRewardId}
          onSelectReward={setSelectedRewardId}
          disableSelect={!isRewardsEnabled || isPrizesLoading}
          isLoading={isPrizesLoading}
        />
        <WinnerPanel
          selectedReward={selectedReward}
          display={display}
          phase={phase}
          winnerIsdn={winnerIsdn}
          isDrawing={isDrawing}
          isRewardsEnabled={isRewardsEnabled && !isPrizesLoading}
          onSelectWinner={startDraw}
          onImportSuccess={() => setIsRewardsEnabled(true)}
        />
        <WinnersTable className="h-[400px]" winners={winners} onExport={exportWinners} />
      </main>

      <Footer />
    </div>
  )
}

export default App
