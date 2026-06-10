import { useState } from 'react'
import exportIcon from '../assets/images/export-icon.svg'
import winnersTag from '../assets/images/winnerstag.webp'
import type { Winner, WinnerType } from '../types'

function maskPhone(phone: string): string {
  const full = phone.startsWith('09') ? phone : `09${phone}`
  if (full.length < 7) return full
  return `${full.slice(0, 4)}xxxx${full.slice(-3)}`
}

interface WinnersTableProps {
  winners: Winner[]
  onExport: () => void
  className?: string
}

function WinnersTable({ winners, onExport, className }: WinnersTableProps) {
  const [activeTab, setActiveTab] = useState<WinnerType>('weekly')

  const filteredWinners = winners.filter((w) => w.type === activeTab) 

  return (
    <aside className="w-[300px] shrink-0">
      <div className={`flex flex-col overflow-hidden rounded-xl bg-[#701e11] ${className ?? 'h-[400px]'}`}>
        <div className="bg-[#963c2e] h-10 flex items-center justify-center shrink-0 rounded-t-xl">
          <img
            src={winnersTag}
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
                aria-selected={activeTab === 'weekly'}
                onClick={() => setActiveTab('weekly')}
                className={`font-supreme-regular text-xs px-3 py-1 rounded-full border-0 cursor-pointer ${activeTab === 'weekly'
                  ? 'bg-[#ededed] text-[#0d0d0d]'
                  : 'bg-transparent border border-[#acacac] text-white'
                  }`}
              >
                Weekly
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'grand'}
                onClick={() => setActiveTab('grand')}
                className={`font-supreme-regular text-xs px-3 py-1 rounded-full cursor-pointer border ${activeTab === 'grand'
                  ? 'bg-[#ededed] text-[#0d0d0d] border-[#ededed]'
                  : 'bg-transparent border-[#acacac] text-white'
                  }`}
              >
                Grand
              </button>
            </div>
            <button
              type="button"
              onClick={onExport}
              className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0"
              aria-label="Export winners"
            >
              <img src={exportIcon} alt="" className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-supreme-regular font-bold text-[#e61d25] text-xs underline">
                Export
              </span>
            </button>
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
            {filteredWinners.length === 0 ? (
              <p className="font-ui text-white/50 text-xs text-center mt-4 m-0">
                No winners yet
              </p>
            ) : (
              filteredWinners.map((winner, index) => (
                <div
                  key={winner.id}
                  className="grid grid-cols-[24px_minmax(0,1fr)_80px] gap-1.5 items-start"
                >
                  <span className="font-ui text-white text-[12px] text-center pt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0  gap-2 justify-center items-center">
                    <img
                      src={winner.prizeImage}
                      alt=""
                      className="mt-0.5 h-7 w-7 shrink-0 object-contain"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 font-ui text-[12px] leading-snug text-white">
                      {winner.prizeName}
                    </span>
                  </div>
                  <span className="font-ui text-[12px] text-right leading-snug text-white">
                    {maskPhone(winner.phone)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default WinnersTable
