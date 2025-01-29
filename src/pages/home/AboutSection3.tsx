import { VintageTVSlider } from "@/components/RetroTVPlayer";
import Title from "@/components/Title";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";

const AboutSection3 = () => {
  const images = [
    "/assets/herobg.svg",
    "/assets/herobg2.svg",
    "/assets/herobg3.svg",
  ];

  return (
    <div className="bg-[#E3E3E3]">
      <div className="container flex flex-col lg:flex-row py-24 ">
        <div className="w-full flex flex-col lg:flex-row gap-16 ">
          <div className=" flex flex-col w-full justify-center">
            <h1 className="text-3xl md:text-4xl font-judson">
              Get the Hair You’ve Been Dreaming About, With Care
            </h1>
            <Title title={"ABOUT"} align="left" className=" my-8" />
            <p className=" text-text-color">
              At Saloon Prabhu, we bring elegance to life with care, Our expert
              stylists ensure you leave looking and feeling your best. From
              classic cuts to modern styles, we craft each look to match your
              unique beauty. Let us make every visit a delightful experience.
            </p>
          </div>
          <div className=" w-full relative flex justify-start lg:mb-0">
            <VintageTVSlider
              images={images}
              interval={3000} // Optional: change slide interval (default 3s)
              width={600} // Optional: customize size
              height={450} // Optional: customize size
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection3;
