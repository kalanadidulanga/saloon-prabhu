import { OrnateFrame } from "@/components/ornate-frame";
import Title from "@/components/Title";

const AboutSection = () => {
  return (
    <div className="container flex flex-col lg:flex-row py-24">
      <div className="w-full flex flex-col lg:flex-row gap-16 ">
        <div className=" w-full relative flex justify-start lg:mb-0">
          <OrnateFrame
            image="/assets/prabhu2.svg"
            alt="Beautiful landscape"
            aspectRatio="portrait"
            // width={600}
            // height={450}
            className=" w-full max-w-md"
          />
        </div>
        <div className=" flex flex-col w-full justify-center">
          <Title title={"ABOUT"} align="left" className="" />
          <h1 className="text-3xl md:text-4xl font-judson my-8">
            Welcome to Prabhu Salon Where Beauty Meets Expertise
          </h1>
          <p className=" text-text-color">
            At Prabhu Salon, we believe in the transformative power of beauty.
            Our mission is simple: to make you look and feel your absolute best.
            We offer a wide range of professional hair, skin, and nail services,
            all performed by a team of skilled, passionate, and experienced
            professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
