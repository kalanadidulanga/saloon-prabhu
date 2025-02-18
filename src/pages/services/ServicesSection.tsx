import { FramedContent } from "@/components/FramedContent";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ServicesSection = () => {
  const { fetch, loading } = useAxios();
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const { data } = await fetch({
        url: "/api/services",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data);

        setServices(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services. Please try again.");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // const WHY_CHOOSE_US = [
  //   {
  //     id: 1,
  //     image: "/assets/service1.png",
  //     title: "Professional Haircuts and Styling",
  //     description:
  //       "From timeless, classic cuts to trendy, modern styles, we cater to both men and women. Whether you're looking for a sharp professional look, a casual everyday style, or a bold new transformation, our expert stylists tailor each cut to suit your personality and preferences. We ensure you leave with a style that enhances your unique features and confidence.",
  //   },
  //   {
  //     id: 2,
  //     image: "/assets/service2.png",
  //     title: "Bridal and Event Makeup",
  //     description:
  //       "Create unforgettable memories with our glamorous makeup and hairstyling services for weddings, parties, and special occasions. From natural, elegant looks to bold, head-turning styles, we customize each look to suit your outfit, theme, and personality. Our expert team ensures long-lasting, flawless results that keep you radiant throughout your special day.",
  //   },
  //   {
  //     id: 3,
  //     image: "/assets/service3.png",
  //     title: "Hair Treatments and Coloring",
  //     description:
  //       "Revitalize your hair with our luxurious hair spa treatments, designed to nourish and strengthen your locks. Our keratin treatments restore smoothness and shine, leaving your hair frizz-free and manageable. Explore our customized hair color services, from subtle highlights to bold transformations, all tailored to enhance your unique style and personality.",
  //   },
  // ];

  return (
    <div className=" container py-24">
      <div className=" flex flex-col items-center flex-1">
        <h2 className="text-3xl md:text-4xl font-judson">
          Salon Prabhu - Services
        </h2>
        <p className=" mt-8 text-[#525252] text-sm lg:text-base text-center max-w-3xl">
          At Salon Prabhu, we believe every client deserves a premium grooming
          experience. Our team of expert stylists and beauticians is dedicated
          to transforming your look and ensuring you leave feeling confident,
          refreshed, and pampered.
        </p>

        {loading && <p className=" text-center mt-8 text-xl">Loading...</p>}

        <div className=" mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {services.length > 0 &&
            services.map((item: any) => (
              <FramedContent
                key={item.id}
                className="bg-Color shadow-lg"
                frameSrc="/assets/frame5.png"
                topImg={item.imgUrl}
              >
                <div className=" flex flex-col items-center gap-6 px-16 md:px-8 py-32 md:pb-12 md:pt-24 ">
                  <h1 className="text-center text-lg font-medium text-color-9 uppercase">
                    {item.title}
                  </h1>
                  <p className="text-center text-color-9/75">
                    {item.description}
                  </p>
                </div>
              </FramedContent>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
