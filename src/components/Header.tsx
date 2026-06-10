import tv360Logo from "../assets/images/tv360-logo.webp";
import wcLogo from "../assets/images/wc-logo.webp";

function Header() {
  return (
    <header className="flex shrink-0 items-center gap-4 px-[90px] pt-[clamp(0.75rem,2vh,1.5rem)] pb-[clamp(0.25rem,1vh,0.5rem)] max-[1200px]:px-8">
      <div className="border-r-2 border-[#9F9F9F] pr-4">
        <img
          src={tv360Logo}
          alt="TV360 Myanmar"
          className="h-[clamp(52px,8vh,80px)] w-[clamp(52px,8vh,80px)] object-contain"
        />
      </div>
      <img
        src={wcLogo}
        alt="FIFA World Cup 26"
        className="h-[clamp(48px,7vh,70px)] w-[clamp(48px,7vh,70px)] object-contain"
      />
    </header>
  );
}
export default Header;
