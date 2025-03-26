import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import IntroHeader from "../components/common/IntroHeader";
import IntroLayout from "../components/layouts/IntroLayout";
import FeatureSection from "../components/sections/FeatureSection";
import ReasonSection from "../components/sections/ReasonSection";
import StartButton from "../components/common/Button";

const Introduce = () => {
  const navigate = useNavigate();
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartClick = (skipScroll: boolean = false) => {
    if (!skipScroll && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        navigate("/login");
      }, 700);
    } else {
      navigate("/login");
    }
  };

  return (
    <IntroLayout>
      <IntroHeader />
      <StartButton text="감정 기록 시작하기" onClick={() => handleStartClick(false)} />
      <FeatureSection />
      <ReasonSection />
      <div ref={scrollTargetRef}>
        <StartButton text="감정 기록 시작하기" onClick={() => handleStartClick(true)} />
      </div>
    </IntroLayout>
  );
};

export default Introduce;
