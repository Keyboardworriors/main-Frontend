import { useEffect, useState } from "react";
import feelodyLogo from "../../assets/logo/logo_feelody_wh.png";

const IntroHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-center items-center bg-[#A6CCF2] transition-all duration-300 ${
        isScrolled ? "h-[250px]" : "h-[400px]"
      }`}
    >
      <div
        className={`flex justify-center transition-all duration-300 ${
          isScrolled ? "w-[280px]" : "w-[60%] md:w-[40%] lg:w-[40%]"
        }`}
      >
        <img
          src={feelodyLogo}
          alt="Feelody logo"
          className="transition-all duration-300 ease-in-out w-full h-auto"
        />
      </div>
    </header>
  );
};

export default IntroHeader;
