import { assetPaths } from "../lib/assetPaths";

function Header() {
  return (
    <>
      <header className="flex shrink-0 items-center gap-4 px-[90px] pt-[clamp(0.75rem,2vh,1.5rem)] pb-[clamp(0.25rem,1vh,0.5rem)] max-[1200px]:px-8 mb-6">
        <div className="border-r-2 border-[#9F9F9F] pr-4">
          <img
            src={assetPaths.images.tv360Logo}
            alt="TV360 Myanmar"
            className="h-[clamp(52px,8vh,80px)] w-[clamp(52px,8vh,80px)] object-contain"
          />
        </div>
        <img
          src={assetPaths.images.wcLogo}
          alt="FIFA World Cup 26"
          className="h-[clamp(48px,7vh,70px)] w-[clamp(48px,7vh,70px)] object-contain"
        />
        <img
          src={assetPaths.images.tagline}
          alt="LUCKY 360 CUP"
          className="mx-auto h-[clamp(70px,min(10vw,14vh),180px)] w-auto object-contain lg:h-[clamp(70px,min(7vw,12vh),135px)]"
        />
      </header>
      {/* <section className="shrink-0 px-6 pb-[clamp(0.5rem,1.5vh,1rem)] text-center"></section> */}
    </>
  );
}
export default Header;
