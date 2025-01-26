import ServiceCard from "@/components/ServiceCard";
import { ServiceModal } from "@/components/ServiceModal";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ServicesManager = () => {
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
        {loading && (
          <div className=" flex items-center justify-center w-full mb-8">
            <Loader2 className=" mr-2 animate-spin" /> <span>Loading...</span>
          </div>
        )}
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
