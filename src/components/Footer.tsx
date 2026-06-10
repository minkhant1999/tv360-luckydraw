import footerBar from '../assets/images/footer-bar.webp'
import wcPackages from '../assets/images/wc-packages.webp'
import subTagEng from '../assets/images/sub-tag-eng.webp'
import qrCode from '../assets/images/qr-code.webp'

function Footer() {
  return (
    <footer className="relative shrink-0 w-full h-[103px] mt-auto">
      <img
        src={footerBar}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center justify-between h-full px-[90px]">
        <img
          src={wcPackages}
          alt="World Cup Packages"
          className="h-[69px] w-auto object-contain"
        />
        <img
          src={subTagEng}
          alt="Catch Every Match LIVE from Start to Finish on TV360"
          className="h-[47px] w-auto object-contain"
        />
        <div className="flex items-center gap-3">
          <img
            src={qrCode}
            alt="QR code for tv360.mytel.com.mm/app"
            className="h-[55px] w-auto object-contain"
          />
          <p className="font-ui text-white text-xs m-0 leading-snug">
            Website Link:
            <br />
            tv360.mytel.com.mm/app
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
