import { type ChangeEvent } from 'react'
import phoneDisplayBox from '../assets/images/phone-display-box.svg'
import selectWinnerBtn from '../assets/images/select-winner-btn.svg'
import prizePedestal from '../assets/images/prize-pedestal.webp'
import uploadIcon from '../assets/images/upload-icon.svg'
import { useImportUsersMutation, useSelectWinnerMutation } from '../store/api/luckyDrawApi'
import type { DrawPhase, Reward, SelectWinnerResult } from '../types'
import { formatIsdnForDisplay } from '../utils/normalizePhoneDigits'

const PHONE_MASK = '09xxxxxxxxx'

function formatPhoneDisplay(digits: string, phase: DrawPhase, isdn?: string): string {
  if (phase === 'idle') return PHONE_MASK
  if (phase === 'complete' && isdn) return formatIsdnForDisplay(isdn)
  return `09${digits}`
}

interface WinnerPanelProps {
  selectedReward: Reward
  display: string
  phase: DrawPhase
  winnerIsdn: string | null
  isDrawing: boolean
  isRewardsEnabled: boolean
  onSelectWinner: (result: SelectWinnerResult) => void
  onImportSuccess: () => void
}

function WinnerPanel({
  selectedReward,
  display,
  phase,
  winnerIsdn,
  isDrawing,
  isRewardsEnabled,
  onSelectWinner,
  onImportSuccess,
}: WinnerPanelProps) {
  const [importUsers, { isLoading: isUploading }] = useImportUsersMutation()
  const [selectWinner, { isLoading: isSelectingWinner }] = useSelectWinnerMutation()

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const response = await importUsers(file).unwrap()
      if (response.success) {
        onImportSuccess()
      }
    } catch (error) {
      console.error('Failed to import users:', error)
    } finally {
      event.target.value = ''
    }
  }

  const handleSelectWinner = async () => {
    if (!selectedReward?.prizeCode || !selectedReward?.prizeType) return

    try {
      const response = await selectWinner({
        prize: selectedReward.prizeCode,
        prizeType: selectedReward.prizeType,
      }).unwrap()

      if (response.success) {
        onSelectWinner(response.result)
      }
    } catch (error) {
      console.error('Failed to select winner:', error)
    }
  }

  const phoneText = formatPhoneDisplay(display, phase, winnerIsdn ?? undefined)
  const isDrawDisabled =
    isDrawing || !selectedReward || !isRewardsEnabled || isSelectingWinner

  return (
    <section className="winner-panel flex min-w-0 flex-1 flex-col items-center">
      <div className="w-[340px] bg-[#670105] h-[34px] flex items-center justify-center shrink-0">
        <p className="font-supreme-bold text-base m-0 bg-gradient-to-b from-[#ff8a04] to-[#fc0] bg-clip-text text-transparent">
          {selectedReward?.name ?? 'Select a reward'}
        </p>
      </div>

      <div className="relative mb-1 mt-2 flex h-[clamp(100px,16vh,180px)] w-full shrink-0 justify-center">
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
            className="relative z-10 mt-6 h-[clamp(80px,14vh,150px)] w-auto object-contain drop-shadow-lg"
          />
        )}
      </div>

      <div className="flex flex-col items-center mt-2 w-full max-w-[550px]">
        <p className="font-povlar text-sm bg-[linear-gradient(180deg,#FFFFFF_0%,#BDBDBD_100%)] italic bg-clip-text text-transparent tracking-wide pt-4 pb-2 mb-1 ">
          WINNER&apos;s PHONE NUMBER
        </p>

        <div className="relative w-full max-w-[550px] h-[53px] flex items-center justify-center">
          <img
            src={phoneDisplayBox}
            alt=""
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            aria-hidden="true"
          />
          <p
            className="relative z-10 font-povlar text-[clamp(1.25rem,2.5vw,1.75rem)] m-0 tracking-wider tabular-nums bg-[linear-gradient(172deg,#000_23%,#5d5d5d_77%)] bg-clip-text text-transparent"
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
        onClick={handleSelectWinner}
        disabled={isDrawDisabled}
        aria-label="Select winner"
      >
        <img
          src={selectWinnerBtn}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative z-10 italic font-povlar text-xl bg-gradient-to-b from-white to-[#d4d3d3] bg-clip-text text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] pt-1">
          {isDrawing || isSelectingWinner ? 'DRAWING...' : 'SELECT WINNER'}
        </span>
      </button>

      <label
        className={`mt-4 flex items-center gap-3 bg-[#6e6e6e] px-3 py-2 rounded-[20px] shadow-md transition-colors ${
          isUploading
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:bg-[#5a5a5a]'
        }`}
      >
        <img src={uploadIcon} alt="" className="w-5 h-5" aria-hidden="true" />
        <span className="font-supreme-regular text-white text-base underline">
          {isUploading ? 'Uploading...' : 'Upload File'}
        </span>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          className="sr-only"
          onChange={handleUploadFile}
          disabled={isUploading}
          aria-label="Upload participant file"
        />
      </label>
    </section>
  )
}

export default WinnerPanel
