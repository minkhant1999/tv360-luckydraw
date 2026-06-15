import { Modal } from 'antd'
import { assetPaths } from '../lib/assetPaths'
import type { SelectWinnerResult } from '../types'
import { getPrizeImageByCode } from '../utils/mapPrizesToRewards'
import { formatIsdnForDisplay } from '../utils/normalizePhoneDigits'

interface CongratulationsModalProps {
  open: boolean
  onClose: () => void
  result: SelectWinnerResult | null
}
function CongratulationsModal({ open, onClose, result }: CongratulationsModalProps) {
  if (!result) return null

  const prizeImage = getPrizeImageByCode(result.prizeCode)
  const phoneText = formatIsdnForDisplay(result.isdn)

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
      closable
      rootClassName="congratulations-modal"
      classNames={{
        container: 'bg-transparent shadow-none p-0 overflow-visible',
        body: 'p-0',
      }}
      styles={{
        container: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
        body: {
          padding: 0,
        },
        close: {
          color: '#fff',
          top: 12,
          right: 12,
        },
      }}
    >
      <div className="relative overflow-hidden rounded-[28px] border-2 border-[#fc0] bg-[#a80000] px-6 pb-8 pt-10 text-center shadow-[0_0_24px_rgba(255,200,0,0.35)]">
        <img
          src={assetPaths.images.confetti}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full mix-blend-screen"
          aria-hidden="true"
        />
        <h2
          className="font-supreme-extrabold relative z-10 m-0 whitespace-nowrap text-[clamp(1.75rem,5vw,2.25rem)] uppercase leading-none tracking-wide text-white"
          style={{
            textShadow:
              '2px 2px 0 #6b0000, -2px -2px 0 #6b0000, 2px -2px 0 #6b0000, -2px 2px 0 #6b0000, 0 4px 8px rgba(0,0,0,0.35)',
          }}
        >
          Congratulations!
        </h2>

        <div className="relative z-10 mx-auto mt-6 flex h-[clamp(120px,22vh,180px)] items-center justify-center">
          <img
            src={prizeImage}
            alt={result.prizeName}
            className="max-h-full w-auto object-contain drop-shadow-lg"
          />
        </div>

        <p className="font-povlar relative z-10 mt-3 text-sm italic text-white">
          {result.prizeName}
        </p>

        <div className="relative z-10 mx-auto mt-6 flex h-[53px] w-full max-w-[320px] items-center justify-center">
          <img
            src={assetPaths.images.phoneDisplayBox}
            alt=""
            className="absolute inset-0 h-full w-full object-fill pointer-events-none"
            aria-hidden="true"
          />
          <p className="font-povlar relative z-10 m-0 text-[clamp(1.125rem,2.5vw,1.5rem)] tracking-wider tabular-nums bg-[linear-gradient(172deg,#000_23%,#5d5d5d_77%)] bg-clip-text text-transparent">
            {phoneText}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-supreme-bold relative z-10 mt-8 cursor-pointer rounded-full border-2 border-[#fc0] bg-[#670105] px-10 py-2 text-base text-[#fc0] transition-colors hover:bg-[#8a0208]"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default CongratulationsModal
