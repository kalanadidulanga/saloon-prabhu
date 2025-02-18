import { OrnateFrame } from "@/components/ornate-frame";
import Title from "@/components/Title";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";

const AboutSection2 = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FAF4E7]">
      {/* Animated background blobs */}
      {/* <div className="absolute top-0 -left-4 w-72 h-72 bg-color-3 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div> */}
      {/* <div className="absolute top-24 right-12 w-72 h-72 bg-color-6 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div> */}
      {/* <div className="absolute bottom-12 left-24 w-80 h-80 bg-color-3 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div> */}
      {/* <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-3000"></div> */}

      {/* Floating particles */}
      {/* <div className="particle-container absolute inset-0 z-0">
        {[...Array(15)].map((_, index) => (
          <div 
            key={index}
            className={`absolute w-2 h-2 rounded-full bg-color-6 opacity-60 animate-float animation-delay-${index * 500}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div> */}

      <div className="container bg-[url('/assets/bg-line.png')] bg-cover bg-center flex flex-col lg:flex-row py-24 relative z-10">
        <div className="w-full flex flex-col lg:flex-row gap-16 ">
          <div className="w-full relative flex justify-start lg:mb-0">
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-3000"></div>
            {/* <div className="absolute w-full h-full bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-3000"></div> */}
            <OrnateFrame
              image="/assets/prabhu1.svg"
              alt="Beautiful landscape"
              aspectRatio="portrait"
              className="w-full max-w-md"
            />
          </div>
          <div className="flex flex-col w-full justify-center motion-preset-slide-left relative">
            {/* <div className="absolute top-52 left-48 w-72 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
            <div className="absolute w-[500px] left-24 h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

            <h1 className="text-3xl md:text-4xl font-judson relative z-10">
              Get the Hair You've Been Dreaming About, With Care
            </h1>
            <Title
              title={"ABOUT"}
              align="left"
              className="my-8 relative z-10"
            />
            <p className="text-text-color relative z-10">
              At Saloon Prabhu, we bring elegance to life with care, Our expert
              stylists ensure you leave looking and feeling your best. From
              classic cuts to modern styles, we craft each look to match your
              unique beauty. Let us make every visit a delightful experience.
            </p>
          </div>
        </div>
      </div>

      {/* You'll need to add this to your global CSS file */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-4500 { animation-delay: 4.5s; }
        .animation-delay-5000 { animation-delay: 5s; }
        .animation-delay-5500 { animation-delay: 5.5s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-6500 { animation-delay: 6.5s; }
        .animation-delay-7000 { animation-delay: 7s; }
        .animation-delay-7500 { animation-delay: 7.5s; }
      `}</style>
    </div>
  );
};

export default AboutSection2;
