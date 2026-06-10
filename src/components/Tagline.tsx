import lucky360Cup from '../assets/images/lucky-360-cup.webp'
import luckyDrawText from '../assets/images/luckydraw-text.webp'

function Tagline() {
  return (
    <section className="text-center shrink-0 px-6 pb-4">
      <img
        src={lucky360Cup}
        alt="LUCKY 360 CUP"
        className="mx-auto h-[clamp(60px,8vw,103px)] w-auto object-contain"
      />
      <div className="flex items-center justify-center gap-3 mt-1 flex-wrap">
        <p className="font-ui text-white text-base m-0">
          12 June 2026 to 20 July 2026
        </p>
        <img
          src={luckyDrawText}
          alt="LuckyDraw"
          className="h-[26px] w-auto object-contain"
        />
      </div>
    </section>
  )
}

export default Tagline
