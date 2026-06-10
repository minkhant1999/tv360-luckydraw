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
      className={`reward-item w-full flex items-center gap-3 p-0 border-0 bg-transparent cursor-pointer text-left ${
        isSelected ? 'reward-item--selected' : ''
      }`}
      aria-pressed={isSelected}
      aria-label={`Select ${reward.name}`}
    >
      <div className="reward-item__thumb shrink-0 w-[60px] h-[60px] flex items-center justify-center overflow-hidden">
        <img
          src={reward.image}
          alt=""
          className="max-h-[48px] max-w-[48px] object-contain"
        />
      </div>
      <div
        className={`reward-item__card flex-1 flex items-center justify-between px-3 py-2 rounded-lg min-h-[56px] ${
          isSelected
            ? 'border-2 border-[#ffc300] bg-white'
            : 'border border-[#b2020d] bg-white'
        }`}
      >
        <div>
          <p
            className={`font-ui font-medium text-sm m-0 leading-tight ${
              isSelected ? 'text-[#ae1700]' : 'text-[#232323]'
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
            className="w-2 h-2.5 rotate-90 shrink-0"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  )
}

interface RewardsListProps {
  rewards: Reward[]
  selectedRewardId: RewardId
  onSelectReward: (id: RewardId) => void
}

function RewardsList({ rewards, selectedRewardId, onSelectReward }: RewardsListProps) {
  return (
    <aside className="rewards-list shrink-0 w-[333px]">
      <div className="bg-[#7a0513] border border-[#ff2e33] rounded-xl shadow-[1px_4px_24px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col h-[393px]">
        <div className="bg-[#61030e] mx-3 mt-2 rounded-lg px-3 py-3 text-center shrink-0">
          <h2 className="font-ui font-extrabold text-white text-base m-0 leading-tight drop-shadow-sm">
            LUCKY 360 CUP PROMOTION CAMPAIGN REWARDS
          </h2>
        </div>
        <p className="font-ui text-[#c7bebe] text-xs text-center mt-3 mb-2 px-3 m-0 shrink-0">
          Click the item you want to draw
        </p>
        <div className="flex-1 overflow-y-auto px-3 pb-3 flex flex-col gap-2">
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
