import Title from "@/components/Title";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";

const AboutSection2 = () => {
  return (
    <div className="container flex flex-col lg:flex-row py-24">
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className=" w-full relative flex justify-start mb-8 lg:mb-0 border-2">
          <img src="/assets/home2.png" className=" w-full max-w-md" />
        </div>
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
          {/* <Button
            variant={"black"}
            size={"mySize"}
            className="mt-16 mr-auto tracking-wider"
            asChild
          >
            <Link to={"../about"} className=" capitalize font-normal">
              LEARN MORE
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AboutSection2;
