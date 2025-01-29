// import AboutSection from "./AboutSection";
// import ServicesSection from "./ServicesSection";
// import PriceRangeSection from "./PriceRangeSection";
import AppoimentSection from "@/components/AppoimentSection";
// import HashtagGallery from "@/components/HashtagGallery";
import HeroSection2 from "./HeroSection2";
import AboutSection2 from "./AboutSection2";
import AboutSection3 from "./AboutSection3";
import CustomersSection from "./CustomersSection";
// import BookSection from "@/components/BookSection";
import ReviewSection from "./ReviewSection";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import FlipBook from "@/components/FlipBook.jsx";
import SocialFeed from "@/components/SocialFeed";
// import FlipBook from "@/components/FlipBook";
// import AntiqueBook from "@/components/AntiqueBook";
// import Navbar from "@/components/Navbar";

const HomePage = () => {
  const [clients, setClients] = useState([]);
  const { fetch, loading } = useAxios();

  const getClients = async () => {
    try {
      const { data } = await fetch({
        url: "/api/clients",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data);
        setClients(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch Clients");
      }
    } catch (error) {
      console.error("Error fetching Clients:", error);
      toast.error("Failed to fetch Clients. Please try again.");
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  // const SERVICES = [
  //   {
  //     imageUrl: "/assets/service1.png",
  //     title: "Professional Haircuts and Styling",
  //     description:
  //       "From timeless, classic cuts to trendy, modern styles, we cater to both men and women. Whether you're looking for a sharp professional look, a casual everyday style, or a bold new transformation, our expert stylists tailor each cut to suit your personality and preferences. We ensure you leave with a style that enhances your unique features and confidence.",
  //   },
  //   {
  //     imageUrl: "/assets/service2.png",
  //     title: "Bridal and Event Makeup",
  //     description:
  //       "Create unforgettable memories with our glamorous makeup and hairstyling services for weddings, parties, and special occasions. From natural, elegant looks to bold, head-turning styles, we customize each look to suit your outfit, theme, and personality. Our expert team ensures long-lasting, flawless results that keep you radiant throughout your special day.",
  //   },
  //   {
  //     imageUrl: "/assets/service3.png",
  //     title: "Hair Treatments and Coloring",
  //     description:
  //       "Revitalize your hair with our luxurious hair spa treatments, designed to nourish and strengthen your locks. Our keratin treatments restore smoothness and shine, leaving your hair frizz-free and manageable. Explore our customized hair color services, from subtle highlights to bold transformations, all tailored to enhance your unique style and personality.",
  //   },
  // ];

  // const CUSTOMERS = [
  //   {
  //     id: 1,
  //     imageUrl: "/assets/person1.png",
  //     name: "Mrs. Kasthuti",
  //     description: "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: "/assets/person2.png",
  //     name: "Mrs. LOREM",
  //     description: "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "/assets/person3.png",
  //     name: "Mrs. LOREM",
  //     description: "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  //   },
  //   {
  //     id: 4,
  //     imageUrl: "/assets/person4.png",
  //     name: "Mrs. LOREM",
  //     description: "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  //   },
  // ];

  return (
    <>
      {/* <HeroSection /> */}
      <HeroSection2 />

      {/* <AboutSection /> */}
      <AboutSection2 />

      <AboutSection3 />

      <CustomersSection customers={clients} isLoading={loading} />

      {/* <ServicesSection services={SERVICES} /> */}

      {/* <PriceRangeSection /> */}
      {/* <BookSection /> */}
      {/* <AntiqueBook /> */}
      <FlipBook />

      <AppoimentSection />

      <ReviewSection />

      <SocialFeed />
      {/* <HashtagGallery /> */}
    </>
  );
};

export default HomePage;
