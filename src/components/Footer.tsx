import footerBar from '../assets/images/footer-bar.webp'
import wcPackages from '../assets/images/wc-packages.webp'
import subTagEng from '../assets/images/sub-tag-eng.webp'
import qrCode from '../assets/images/qr-code.webp'

function Footer() {
  return (
    <footer className="relative mt-auto h-[clamp(72px,10vh,103px)] w-full shrink-0 overflow-visible">
      <img
        src={footerBar}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full items-end justify-between px-[90px] max-[1200px]:px-8">
        <img
          src={wcPackages}
          alt="World Cup Packages"
          className="h-[clamp(130px,26vh,240px)] w-auto shrink-0 -translate-y-3 object-contain object-left-bottom"
        />
        <img
          src={subTagEng}
          alt="Catch Every Match LIVE from Start to Finish on TV360"
          className="mb-7 h-[clamp(36px,5vh,55px)] w-auto object-contain"
        />
        <div className="mb-4 flex items-center gap-3">
          <img
            src={qrCode}
            alt="QR code for tv360.mytel.com.mm/app"
            className="mb-2 h-[clamp(40px,6vh,56px)] w-auto object-contain"
          />

        </div>
      </div>
    </footer>
  )
}

export default Footer
