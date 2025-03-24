import { HomeLayoutProps } from "../../models/layoutProps";

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4">
      <div className="bg-white rounded-xl p-7 max-w-6xl mx-auto relative min-h-[430px] md:h-[430px]">
        {children}
        <div id="modal-container" className="absolute inset-0 z-50"></div>
      </div>
    </main>
  );
};

export default HomeLayout;
