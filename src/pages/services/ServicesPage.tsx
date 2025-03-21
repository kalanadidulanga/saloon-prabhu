import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import ServicesSection from "./ServicesSection";
// import BookSection from "@/components/BookSection";
import AppoimentSection from "@/components/AppoimentSection";
import Section4 from "./Section4";
// import FlipBook from "@/components/FlipBook.jsx";
import { AnimatedSection } from "../home/HomePage";
// import BookSection from "@/components/BookSection";
import PricesSection from "../home/PricesSection";

const ServicesPage = () => {
  return (
    <>
      <div className="bg-[url('/assets/pageheaderbg.jpg')] bg-cover bg-center">
        <div className="container flex flex-col py-24 items-center">
          <h1 className=" text-5xl md:text-6xl text-primary-bg font-judson">
            Our Services
          </h1>
          <div className=" flex items-center text-primary-bg mt-4 gap-1 text-sm">
            <Link
              to={"../"}
              className=" capitalize font-normal hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={16} /> Services
          </div>
        </div>
      </div>

      <AnimatedSection>
        <ServicesSection />
      </AnimatedSection>


      <PricesSection/>

      {/* <BookSection /> */}
      {/* <AnimatedSection>
        <FlipBook />
      </AnimatedSection> */}

      <AnimatedSection>
        <AppoimentSection />
      </AnimatedSection>

      <AnimatedSection>
        <Section4 />
      </AnimatedSection>
    </>
  );
};

export default ServicesPage;
