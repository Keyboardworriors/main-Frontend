import reasonEmotion from "../../assets/images/reasonEmotion.png";
import reasonMusic from "../../assets/images/reasonMusic.png";
import reasonChart from "../../assets/images/reasonChart.png";

type Reason = {
  title: string;
  description: string[];
  imageSrc: string;
};

const reasons: Reason[] = [
  {
    title: "숨겨진 감정까지 놓치지 않아요",
    description: [
      "당신의 감정을 섬세하게 읽어 그 순간에",
      "가장 알맞는 감정을 찾아드려요.",
      "당신의 마음을 알아주는 특별한 경험!",
    ],
    imageSrc: reasonEmotion,
  },
  {
    title: "감정에 딱 맞는 음악을 만나요",
    description: [
      "복잡한 감정도 음악과 함께라면,",
      "더 풍부하게 표현할 수 있어요.",
      "당신만의 감성이 담긴 일기장을 만들어보세요.",
    ],
    imageSrc: reasonMusic,
  },
  {
    title: "나의 감정 패턴을 발견해요!",
    description: [
      "시간에 따라 변화하는 감정들을 예쁜 그래프로",
      "한눈에 확인! 나도 몰랐던 나의 감정 패턴을",
      "발견하는 즐거움을 느껴보세요.",
    ],
    imageSrc: reasonChart,
  },
];

const ReasonSection = () => {
  return (
    <section className="text-center mt-24">
      <h2 className="text-3xl font-bold text-gray-700">왜 필로디를 써야 하나요?</h2>

      <div className="flex justify-center">
        <div className="w-1 h-14 bg-gray-400 mt-6"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-12 gap-20">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col items-center text-center w-64">
            <div className="w-60 h-60 rounded-full overflow-hidden flex justify-center items-center shadow-md">
              <img
                src={reason.imageSrc}
                alt={reason.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-6 text-lg font-semibold text-[#A6CCF2]">{reason.title}</p>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              {reason.description.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonSection;
