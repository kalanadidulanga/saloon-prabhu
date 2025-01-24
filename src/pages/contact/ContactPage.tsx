import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import ContactFormSection from "./ContactFormSection";
import AppoimentSection from "@/components/AppoimentSection";
import LocationSection from "./LocationSection";

const ContactPage = () => {
  return (
    <div>
      <div className="bg-[url('/assets/contactpageheaderbg.svg')] bg-cover bg-left md:bg-center">
        <div className="container flex flex-col py-24 items-start">
          <h1 className=" text-5xl md:text-6xl text-primary-bg font-judson">
            Contact Us
          </h1>
          <div className=" flex items-center text-primary-bg mt-4 gap-1 text-sm">
            <Link
              to={"../"}
              className=" capitalize font-normal hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={16} /> Contact us
          </div>
        </div>
      </div>

      <ContactFormSection />
      <AppoimentSection />
      <LocationSection />
    </div>
  );
};

export default ContactPage;
