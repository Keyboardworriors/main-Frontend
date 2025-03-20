import { useNavigate } from "react-router-dom";
import IntroHeader from "../components/common/IntroHeader";
import IntroLayout from "../components/layouts/IntroLayout";
import FeatureSection from "../components/sections/FeatureSection";
import ReasonSection from "../components/sections/ReasonSection";
import StartButton from "../components/common/Button";

const Introduce = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <IntroLayout>
      <IntroHeader />
      <StartButton text="감정 기록 시작하기" onClick={handleStartClick} />
      <FeatureSection />
      <ReasonSection />
      <StartButton text="감정 기록 시작하기" onClick={handleStartClick} />
    </IntroLayout>
  );
};

export default Introduce;
