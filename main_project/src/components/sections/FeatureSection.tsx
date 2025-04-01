import imageEmotion from "../../assets/images/imageEmotion.jpg";
import imageChart from "../../assets/images/imageChart.jpg";

type FeatureSectionProps = {
  title: string;
  description: string[];
  imageOnLeft?: boolean;
  imageSrc: string;
};

const sections: FeatureSectionProps[] = [
  {
    title: "감정을 음악으로 표현하는 AI기술",
    description: [
      "필로디가 당신의 일기에서 감정을 읽어내고,",
      "그 순간의 마음에 딱 맞는 음악을 찾아드려요.",
      "당신의 감정을 멜로디에 담아보세요!",
    ],
    imageOnLeft: true,
    imageSrc: imageEmotion,
  },
  {
    title: "당신만의 감정 발자취를 기록해요",
    description: [
      "매일 기록하는 일기와 음악이 모여 특별한",
      "감정 스토리가 완성돼요. 시간이 흐르며 변화하는",
      "나의 감정 흐름을 발견하는 기쁨을 느껴보세요",
    ],
    imageOnLeft: false,
    imageSrc: imageChart,
  },
];

const FeatureSection = () => {
  return (
    <section className="mt-20">
      <div className="flex flex-col gap-12">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-wrap md:flex-nowrap justify-center items-center gap-6 ${
              section.imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={section.imageSrc}
                alt={section.title}
                className="w-full h-60 md:h-80 rounded-lg object-contain border border-gray-200 shadow-lg"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#A6CCF2]">{section.title}</h2>
              <p className="mt-4 text-gray-500 text-center">
                {section.description.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
