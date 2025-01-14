import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PriceRangeSection from "./PriceRangeSection";

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
    <>
      <HeroSection />

      <AboutSection />

      <ServicesSection services={SERVICES} />

      <PriceRangeSection />

      <div className=" bg-rose-500 min-h-screen"></div>
    </>
  );
};

export default HomePage;
