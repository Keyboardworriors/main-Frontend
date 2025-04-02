import { useScrollToTop } from "../../hooks/useScrollTopOnMount";
import { HomeLayoutProps } from "../../models/layoutProps";
import { useLocation } from "react-router-dom";

const HomeLayout = ({ children }: HomeLayoutProps) => {
  useScrollToTop();
  const location = useLocation();

  const isCallbackPage = ["/oauth/kakao/callback", "/oauth/naver/callback"].some(
    (path) => location.pathname.startsWith(path),
  );

  return (
    <main className="relative min-h-screen bg-[#A6CCF2] pt-0 pr-4 pb-4 pl-4">
      <div
        className={`bg-white rounded-xl p-7 max-w-6xl mx-auto relative ${
          isCallbackPage ? "min-h-[400px]" : "min-h-[calc(100vh-220px)] lg:min-h-fit"
        }`}
      >
        {children}
        <div id="modal-container" className="absolute inset-0 z-5 pointer-events-none"></div>
        <div id="top-level-modal-container" className="absolute inset-0 z-30 pointer-events-none"></div>
      </div>
    </main>
  );
};

export default HomeLayout;