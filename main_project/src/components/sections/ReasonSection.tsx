type Reason = {
  title: string;
  description: string;
};

const reasons: Reason[] = [
  { title: "이유 1", description: "감정 분석 AI 기반" },
  { title: "이유 2", description: "개인 맞춤형 피드백" },
  { title: "이유 3", description: "쉽고 편리한 UI" },
];

const ReasonSection = () => {
  return (
    <section className="text-center mt-24">
      <h2 className="text-3xl font-bold text-gray-800">왜 필로디를 써야 하나요?</h2>

      <div className="flex justify-center">
        <div className="w-1 h-14 bg-gray-400 mt-6"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-12 gap-20">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col items-center text-center w-64">
            <div className="w-60 h-60 bg-gray-300 rounded-full"></div>
            <p className="mt-6 text-lg font-semibold text-gray-700">{reason.title}</p>
            <p className="mt-2 text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonSection;
