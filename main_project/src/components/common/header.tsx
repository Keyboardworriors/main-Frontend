import React from "react";
import feelodyLogo from "../../assets/logo/logo_feelody_wh.png";

const Header = () => {
  return (
    <header className="flex justify-center items-center w-full h-[300px] bg-[#A6CCF2]">
      <div className="w-[50%] md:w-[40%] lg:w-[30%] flex justify-center">
        <img src={feelodyLogo} alt="Feelody logo" className="max-w-full h-auto" />
      </div>
    </header>
  );
};

export default Header;
