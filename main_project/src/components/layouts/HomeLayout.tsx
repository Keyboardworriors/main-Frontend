import { HomeLayoutProps } from "../../models/type";

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4">
      <div className="bg-white rounded-xl p-7 max-w-6xl mx-auto">{children}</div>
    </main>
  );
};

export default HomeLayout;
