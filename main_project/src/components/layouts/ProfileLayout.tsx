import { ReactNode } from "react";
import { useScrollToTop } from "../../hooks/useScrollTopOnMount";

export interface ProfileLayoutProps {
  children: ReactNode;
}
const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  useScrollToTop();

  return (
    <main className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4">
      <div className="bg-white rounded-xl p-7 max-w-6xl mx-auto min-h-[430px]">{children}</div>
    </main>
  );
};

export default ProfileLayout;
