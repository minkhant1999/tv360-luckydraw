import type { ChangeEvent } from 'react'
import phoneDisplayBox from '../assets/images/phone-display-box.svg'
import selectWinnerBtn from '../assets/images/select-winner-btn.svg'
import prizePedestal from '../assets/images/prize-pedestal.svg'
import uploadIcon from '../assets/images/upload-icon.svg'
import type { DrawPhase, Reward } from '../types'

const PHONE_MASK = '09xxxxxxxxx'

function formatPhoneDisplay(digits: string, phase: DrawPhase): string {
  if (phase === 'idle') return PHONE_MASK
  return `09${digits}`
}

interface WinnerPanelProps {
  selectedReward: Reward
  display: string
  phase: DrawPhase
  isDrawing: boolean
  onSelectWinner: () => void
  onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void
}

function WinnerPanel({
  selectedReward,
  display,
  phase,
  isDrawing,
  onSelectWinner,
  onUploadFile,
}: WinnerPanelProps) {
  const phoneText = formatPhoneDisplay(display, phase)

  return (
    <section className="winner-panel flex-1 flex flex-col items-center min-w-0">
      <div className="w-[340px] bg-[#670105] h-[34px] flex items-center justify-center shrink-0">
        <p className="font-ui font-bold text-base m-0 text-gradient-gold">
          {selectedReward?.name ?? 'Select a reward'}
        </p>
      </div>

      <div className="relative w-full flex justify-center mt-2 mb-1 h-[180px]">
        <img
          src={prizePedestal}
          alt=""
          className="absolute bottom-0 w-[340px] max-w-full h-auto pointer-events-none"
          aria-hidden="true"
        />
        {selectedReward && (
          <img
            src={selectedReward.image}
            alt={selectedReward.name}
            className="relative z-10 h-[120px] w-auto object-contain mt-6 drop-shadow-lg"
          />
        )}
      </div>

      <div className="flex flex-col items-center mt-2 w-full max-w-[550px]">
        <p className="font-display text-xs text-gradient-label tracking-wide m-0 mb-1 uppercase">
          WINNER&apos;S PHONE NUMBER
        </p>

        <div className="relative w-full max-w-[550px] h-[53px] flex items-center justify-center">
          <img
            src={phoneDisplayBox}
            alt=""
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            aria-hidden="true"
          />
          <p
            className={`relative z-10 font-display text-[clamp(1.5rem,3vw,2rem)] m-0 tracking-wider text-gradient-phone ${
              phase === 'spinning' ? 'animate-pulse' : ''
            }`}
            aria-live="polite"
            aria-label={`Phone number: ${phoneText}`}
          >
            {phoneText}
          </p>
        </div>

        {isDrawing && (
          <p className="font-ui text-[#c7bebe] text-xs mt-2 m-0">
            {phase === 'spinning' ? 'Drawing winner...' : 'Revealing number...'}
          </p>
        )}
      </div>

      <button
        type="button"
        className="relative mt-6 w-[286px] h-[65px] border-0 bg-transparent cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        onClick={onSelectWinner}
        disabled={isDrawing || !selectedReward}
        aria-label="Select winner"
      >
        <img
          src={selectWinnerBtn}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative z-10 font-display text-xl text-gradient-btn pt-1">
          {isDrawing ? 'DRAWING...' : 'SELECT WINNER'}
        </span>
      </button>

      <label className="mt-4 flex items-center gap-3 bg-[#6e6e6e] px-3 py-2 rounded-[20px] shadow-md cursor-pointer hover:bg-[#5a5a5a] transition-colors">
        <img src={uploadIcon} alt="" className="w-5 h-5" aria-hidden="true" />
        <span className="font-ui font-medium text-white text-base underline">
          Upload File
        </span>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          className="sr-only"
          onChange={onUploadFile}
          aria-label="Upload participant file"
        />
      </label>
    </section>
  )
}

export default WinnerPanel
