import ServiceCard from "@/components/ServiceCard";
import { ServiceModal } from "@/components/ServiceModal";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ServicesManager = () => {
  const { fetch } = useAxios();
  const [services, setServices] = useState([]);

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

  const refreshServices = () => {
    getServices();
  };

  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Services Manager</h1>
        <ServiceModal side="bottom" type="new" onRefresh={refreshServices}>
          <Button>Add New</Button>
        </ServiceModal>
      </div>

      <div className=" flex-1 mt-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.length > 0 &&
            services.map((service: any, index: number) => {
              return (
                <ServiceCard
                  key={index}
                  imageUrl={service.imgUrl}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  imageAlt={service.title}
                  onRefresh={refreshServices}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ServicesManager;
