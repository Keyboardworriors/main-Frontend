type IntroLayoutProps = {
  children: React.ReactNode;
};

const IntroLayout = ({ children }: IntroLayoutProps) => {
  return (
    <main className="bg-[#A6CCF2] min-h-screen pt-0 pr-4 pb-4 pl-4">
      <div className="absolute top-0 left-0 w-full h-full bg-[#A6CCF2] -z-10"></div>
      <div className="bg-white rounded-xl p-7 min-h-[500px] mt-[250px] max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
};

export default IntroLayout;
