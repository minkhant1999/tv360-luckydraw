import { useState } from 'react'
import { assetPaths } from '../lib/assetPaths'
import { useGetHisotryQuery, useLazyExportWinnersQuery } from '../store/api/luckyDrawApi'
import type { WinnerType } from '../types'
import { downloadBlob } from '../utils/downloadBlob'
import { parseApiError, type PopUpError } from '../utils/parseApiError'
import ErrorPopUp from '../common/ErrorPopUp'

function maskPhone(phone: string | number): string {
  const digits = String(phone).replace(/\D/g, '')
  const full = digits.startsWith('09') ? digits : `09${digits}`
  if (full.length < 7) return full
  return `${full.slice(0, 4)}xxxx${full.slice(-3)}`
}

interface WinnersTableProps {
  prizeType: WinnerType
  onPrizeTypeChange: (type: WinnerType) => void
  className?: string
}

function WinnersTable({ prizeType, onPrizeTypeChange, className }: WinnersTableProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [uploadError, setUploadError] = useState<PopUpError | null>(null)

  const { data: historyData = [], isFetching, isError } = useGetHisotryQuery({ type: prizeType })
  const [exportWinners] = useLazyExportWinnersQuery()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const blob = await exportWinners({ type: prizeType }).unwrap()
      downloadBlob(blob, `winners-${prizeType.toLowerCase()}.xlsx`)
    } catch (error) {
      setUploadError(parseApiError(error))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <aside className="w-[300px] shrink-0">
      <div className={`flex flex-col overflow-hidden rounded-xl bg-[#701e11] ${className ?? 'h-[400px]'}`}>
        <div className="bg-[#963c2e] h-10 flex items-center justify-center shrink-0 rounded-t-xl">
          <img
            src={assetPaths.images.winnersTag}
            alt="WINNERS"
            className="h-[22px] w-auto object-contain"
          />
        </div>

        <div className="px-3 pt-3 pb-2 flex flex-col flex-1 min-h-0 gap-3">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex gap-3" role="tablist" aria-label="Winner categories">
              <button
                type="button"
                role="tab"
                aria-selected={prizeType === 'WEEKLY'}
                onClick={() => onPrizeTypeChange('WEEKLY')}
                className={`font-supreme-regular text-xs px-3 py-1 rounded-full border-0 cursor-pointer ${prizeType === 'WEEKLY'
                  ? 'bg-[#ededed] text-[#0d0d0d]'
                  : 'bg-transparent border border-[#acacac] text-white'
                  }`}
              >
                Weekly
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={prizeType === 'GRAND'}
                onClick={() => onPrizeTypeChange('GRAND')}
                className={`font-supreme-regular text-xs px-3 py-1 rounded-full cursor-pointer border ${prizeType === 'GRAND'
                  ? 'bg-[#ededed] text-[#0d0d0d] border-[#ededed]'
                  : 'bg-transparent border-[#acacac] text-white'
                  }`}
              >
                Grand
              </button>
            </div>
            {historyData.length > 0 && (
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Export winners"
              >
                <img src={assetPaths.images.exportIcon} alt="" className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="font-supreme-regular font-bold text-[#e61d25] text-xs underline">
                  {isExporting ? 'Exporting…' : 'Export'}
                </span>
              </button>
            )}
          </div>

          <div className="shrink-0">
            <div className="grid grid-cols-[24px_minmax(0,1fr)_80px] gap-1 font-supreme-extrabold text-[#ff9585] text-[10px] px-0.5">
              <span className="text-center">NO</span>
              <span className="text-center">PRIZE</span>
              <span className="whitespace-nowrap">PHONE NUMBER</span>
            </div>
            <hr className="border-[#ff9585]/40 mt-1.5 mb-0" />
          </div>

          <div className="flex-1 overflow-y-auto supreme-regular min-h-0 flex flex-col gap-2 pr-1 [scrollbar-width:thin] [scrollbar-color:#ff9585_#701e11] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-[#701e11] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[#ff9585]">
            {isFetching ? (
              <p className="font-ui text-white/50 text-xs text-center mt-4 m-0">Loading…</p>
            ) : isError ? (
              <p className="font-ui text-white/50 text-xs text-center mt-4 m-0">Failed to load winners</p>
            ) : historyData.length === 0 ? (
              <p className="font-ui text-white/50 text-xs text-center mt-4 m-0">No winners yet</p>
            ) : (
              historyData.map((winner, index) => (
                <div
                  key={winner.id}
                  className="grid grid-cols-[24px_minmax(0,1fr)_80px] gap-1.5 items-start"
                >
                  <span className="font-ui text-white text-[12px] text-center pt-0.5">
                    {index + 1}
                  </span>
                  <span className="min-w-0 font-ui text-[12px] leading-snug text-white text-center">
                    {winner.prizeName}
                  </span>
                  <span className="font-ui text-[12px] text-right leading-snug text-white">
                    {maskPhone(winner.phoneNumber)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ErrorPopUp
        error={uploadError}
        onClose={() => setUploadError(null)}
      />
    </aside>
  )
}

export default WinnersTable
