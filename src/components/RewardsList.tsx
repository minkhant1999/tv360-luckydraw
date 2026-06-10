import selectedArrow from '../assets/images/selected-arrow.svg'
import type { Reward, RewardId } from '../types'

interface RewardItemProps {
  reward: Reward
  isSelected: boolean
  onSelect: (id: RewardId) => void
}

function RewardItem({ reward, isSelected, onSelect }: RewardItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(reward.id)}
      className="group relative w-full min-h-[65px] border-0 bg-transparent cursor-pointer pr-3 text-left "
      aria-pressed={isSelected}
      aria-label={`Select ${reward.name}`}
    >
      <div className="pointer-events-none absolute left-1.5 top-[31px] z-20 flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center">
        <img
          src={reward.image}
          alt=""
          className="h-[62px] w-[64px] object-contain drop-shadow-md"
        />
      </div>

      <div
        className={`ml-[28px] flex-1 ${isSelected
          ? 'rounded-xl p-[2.28px] bg-[radial-gradient(ellipse_32%_22%_at_50%_0%,#ffc400_0%,#ff080e_62%,#ff080e_100%)]'
          : ''
          }`}
      >
        <div
          className={`relative flex min-h-[56px] items-center justify-between overflow-hidden rounded-xl bg-white py-2 pl-[34px] pr-3 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-[#ffc300] group-focus-visible:outline-offset-2 ${!isSelected ? 'border border-solid border-[#b2020d]' : ''
            }`}
        >
          {isSelected && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-[42px] bg-[linear-gradient(to_right,#F9C723_0%,rgba(249,199,35,0.45)_55%,rgba(249,199,35,0)_100%)]"
            />
          )}
          <div className="relative z-10 min-w-0 flex-1 left-2">
            <p
              className={`font-supreme-bold text-sm m-0 leading-tight ${isSelected ? 'text-[#ae1700]' : 'text-[#232323]'
                }`}
            >
              {reward.name}
            </p>
            <p className="font-ui font-medium text-[11px] text-[#8d8c8c] m-0 mt-0.5">
              {reward.drawn}/{reward.quantity}
            </p>
          </div>
          {isSelected && (
            <img
              src={selectedArrow}
              alt=""
              className="relative z-10 h-3 w-3 shrink-0 rotate-90"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </button>
  )
}

interface RewardsListProps {
  rewards: Reward[]
  selectedRewardId: RewardId
  onSelectReward: (id: RewardId) => void
  className?: string
}

function RewardsList({ rewards, selectedRewardId, onSelectReward, className }: RewardsListProps) {
  return (
    <aside className="w-[333px] shrink-0">
      <div className={`flex flex-col overflow-hidden rounded-xl border border-[#ff2e33] bg-[#7a0513] shadow-[1px_4px_24px_rgba(0,0,0,0.25)] ${className ?? 'h-[430px]'}`}>
        <div className="bg-[#61030e] mx-3 mt-2 rounded-lg px-3 py-3 text-center shrink-0">
          <h2 className="font-supreme-extrabold text-white text-base m-0 leading-tight [-webkit-text-stroke:1px_#ff080e] [paint-order:stroke_fill]">
            LUCKY 360 CUP PROMOTION CAMPAIGN REWARDS
          </h2>
        </div>
        <p className="font-supreme-regular text-[#c7bebe] text-[13px] text-center mt-1 pb-2 mb-2 px-3 m-0 shrink-0">
          Click the item you want to draw
        </p>
        <div className="flex-1 overflow-y-auto px-3 pb-3 flex flex-col gap-2 [scrollbar-width:thin] [scrollbar-color:#ff2e33_#7a0513] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[#ff2e33]">
          {rewards.map((reward) => (
            <RewardItem
              key={reward.id}
              reward={reward}
              isSelected={selectedRewardId === reward.id}
              onSelect={onSelectReward}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default RewardsList
