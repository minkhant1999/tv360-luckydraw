import tv360Logo from "../assets/images/tv360-logo.webp";
import wcLogo from "../assets/images/wc-logo.webp";

function Header() {
  return (
    <header className="flex items-center gap-4 px-[90px] pt-6 pb-2 shrink-0">
      <img
        src={tv360Logo}
        alt="TV360 Myanmar"
        className="h-[88px] w-[88px] object-contain"
      />
      <img
        src={wcLogo}
        alt="FIFA World Cup 26"
        className="h-[82px] w-[53px] object-contain"
      />
    </header>
  );
}
export default Header;
