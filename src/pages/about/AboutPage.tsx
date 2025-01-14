import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import OurStorySection from "./OurStorySection";
import AboutSection from "./AboutSection copy";

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Blue glow effect */}
      <div className="absolute top-[-60%] right-[-10%] w-[800px] h-[800px] bg-[#3DA1D21F] blur-[100px] rounded-full z-0" />
      <div className="absolute top-[-60%] left-[-10%] w-[800px] h-[800px] bg-[#3DA1D21F] blur-[100px] rounded-full z-0" />

      <div className="relative z-10">
        <div className="container flex flex-col py-24 items-center">
          <h1 className=" text-5xl md:text-6xl text-color-5 font-judson">
            About Us
          </h1>
          <div className=" flex items-center text-text-color mt-4 gap-1 text-sm">
            <Link
              to={"../"}
              className=" capitalize font-normal hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={16} /> About us
          </div>
        </div>
        <AboutSection />
        <OurStorySection />
      </div>
    </div>
  );
};

export default AboutPage;
