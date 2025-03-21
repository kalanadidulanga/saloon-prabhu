import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="container flex flex-col lg:flex-row pt-32 pb-24">
      <div className="w-full flex flex-col lg:flex-row">
        <div className=" flex flex-col w-full">
          <h1 className="text-5xl md:text-6xl font-judson">
            Get the hair you’ve been <br />
            dreaming about
          </h1>
          <p className=" text-text-color mt-6">
            Hair and beauty studio,{" "}
            <span className="font-bold">Unisex salon</span>
          </p>
          <Button
            variant={"black"}
            size={"mySize"}
            className="mt-16 mr-auto tracking-wider"
            asChild
          >
            <Link to={"../about"} className=" capitalize font-normal">
              LEARN MORE
            </Link>
          </Button>
        </div>
        <div className=" w-full relative flex justify-end mt-8 lg:mt-0">
          <img src="/assets/hero2.png" className=" w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
