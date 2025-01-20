import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import OurStorySection from "./OurStorySection";
import AboutSection from "./AboutSection copy";
import AppoimentSection from "@/components/AppoimentSection";
import VisionMissionSection from "./VisionMissionSection";
import Section3 from "./Section3";

const AboutPage = () => {
  return (
    <>
      {/* Blue glow effect */}
      {/* <div className="absolute top-[-60%] right-[-10%] w-[800px] h-[800px] bg-[#3DA1D21F] blur-[100px] rounded-full z-0" /> */}
      {/* <div className="absolute top-[-60%] left-[-10%] w-[800px] h-[800px] bg-[#3DA1D21F] blur-[100px] rounded-full z-0" /> */}

      {/* <div className="relative z-10"> */}
      <div className="bg-[url('/assets/pageheaderbg.svg')] bg-cover bg-center">
        <div className="container flex flex-col py-24 items-center">
          <h1 className=" text-5xl md:text-6xl text-primary-bg font-judson">
            About Us
          </h1>
          <div className=" flex items-center text-primary-bg mt-4 gap-1 text-sm">
            <Link
              to={"../"}
              className=" capitalize font-normal hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={16} /> About us
          </div>
        </div>
      </div>

      <AboutSection />
      <OurStorySection />
      <Section3 />
      <AppoimentSection />

      <VisionMissionSection />
      {/* </div> */}
    </>
  );
};

export default AboutPage;
