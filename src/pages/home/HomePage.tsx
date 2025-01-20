import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PriceRangeSection from "./PriceRangeSection";
import AppoimentSection from "@/components/AppoimentSection";
import HashtagGallery from "@/components/HashtagGallery";
import HeroSection2 from "./HeroSection2";

const HomePage = () => {
  const SERVICES = [
    {
      imageUrl: "/assets/service1.png",
      title: "Professional Haircuts and Styling",
      description:
        "From timeless, classic cuts to trendy, modern styles, we cater to both men and women. Whether you're looking for a sharp professional look, a casual everyday style, or a bold new transformation, our expert stylists tailor each cut to suit your personality and preferences. We ensure you leave with a style that enhances your unique features and confidence.",
    },
    {
      imageUrl: "/assets/service2.png",
      title: "Bridal and Event Makeup",
      description:
        "Create unforgettable memories with our glamorous makeup and hairstyling services for weddings, parties, and special occasions. From natural, elegant looks to bold, head-turning styles, we customize each look to suit your outfit, theme, and personality. Our expert team ensures long-lasting, flawless results that keep you radiant throughout your special day.",
    },
    {
      imageUrl: "/assets/service3.png",
      title: "Hair Treatments and Coloring",
      description:
        "Revitalize your hair with our luxurious hair spa treatments, designed to nourish and strengthen your locks. Our keratin treatments restore smoothness and shine, leaving your hair frizz-free and manageable. Explore our customized hair color services, from subtle highlights to bold transformations, all tailored to enhance your unique style and personality.",
    },
  ];
  return (
    <div className="relative overflow-hidden">
      {/* Blue glow effect */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#3DA1D21F] rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-[-50px] left-[-175px] w-[600px] h-[600px] bg-[#3DA1D21F] rounded-full blur-3xl z-0" />

      <div className="relative z-10">
        {/* <HeroSection /> */}

        <HeroSection2 />

        <AboutSection />

        <ServicesSection services={SERVICES} />

        <PriceRangeSection />

        <AppoimentSection />

        <HashtagGallery />
      </div>
    </div>
  );
};

export default HomePage;
