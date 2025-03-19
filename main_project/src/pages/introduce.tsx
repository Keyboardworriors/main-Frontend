import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartClick = () => {
    setIsAnimating(true); //애니메이션 시작
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 1, y: 0 }}
      animate={isAnimating ? { opacity: 1, y: -1000 } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isAnimating) {
          navigate("/login");
        }
      }}
    >
      <section>
        <button
          onClick={handleStartClick}
          className="px-6 py-3 bg-blue-400 text-white text-lg rounded-3xl hover:bg-blue-500"
        >
          감정 기록 시작하기
        </button>
      </section>
    </motion.div>
  );
};

export default Introduce;
