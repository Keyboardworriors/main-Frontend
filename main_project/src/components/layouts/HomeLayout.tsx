import { HomeLayoutProps } from "../../models/layoutProps";

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="relative min-h-screen bg-[#A6CCF2] pt-0 pr-4 pb-4 pl-4">
      <div className="bg-white rounded-xl p-7 max-w-6xl mx-auto relative">
        {children}
        <div id="modal-container" className="absolute inset-0 z-5 pointer-events-none"></div>
      </div>
    </main>
  );
};
export default HomeLayout;
