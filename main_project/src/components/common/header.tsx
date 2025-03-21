import feelodyLogo from "../../assets/logo/logo_feelody_wh.png";

const Header = () => {
  return (
    <header className="flex justify-center items-center w-full h-[250px] bg-[#A6CCF2]">
      <div className="w-full max-w-[330px] px-4">
        <img src={feelodyLogo} alt="Feelody logo" className="w-full h-auto" />
      </div>
    </header>
  );
};

export default Header;
