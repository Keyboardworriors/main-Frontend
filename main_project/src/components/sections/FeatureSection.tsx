type FeatureSectionProps = {
  title: string;
  description: string;
  imageOnLeft?: boolean;
};

const sections: FeatureSectionProps[] = [
  { title: "필로디의 차별적 기술 1", description: "필로디 소개 1", imageOnLeft: true },
  { title: "필로디의 차별적 기술 2", description: "필로디 소개 2", imageOnLeft: false },
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
              <div className="bg-gray-300 w-full h-60 md:h-80 rounded-lg"></div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-700">{section.title}</h2>
              <p className="mt-4 text-gray-600 text-lg">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
