import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import OurStorySection from "./OurStorySection";
import AboutSection from "./AboutSection copy";
import AppoimentSection from "@/components/AppoimentSection";
import VisionMissionSection from "./VisionMissionSection";
import Section3 from "./Section3";
import { AnimatedSection } from "../home/HomePage";

const AboutPage = () => {
  return (
    <>
      <div className="bg-[url('/assets/pageheaderbg.jpg')] bg-cover bg-center">
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

      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection>
        <OurStorySection />
      </AnimatedSection>

      <AnimatedSection>
        <Section3 />
      </AnimatedSection>

      <AnimatedSection>
        <AppoimentSection />
      </AnimatedSection>

      <AnimatedSection>
        <VisionMissionSection />
      </AnimatedSection>
    </>
  );
};

export default AboutPage;
