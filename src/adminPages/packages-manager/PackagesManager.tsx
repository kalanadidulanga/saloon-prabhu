import { ServiceModal } from "@/components/ServiceModal";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PackagesManager = () => {
  const { fetch, loading } = useAxios();
  const [packages, setPackages] = useState([]);

  const getPackages = async () => {
    try {
      const { data } = await fetch({
        url: "/api/services",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data);

        setPackages(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch packages");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to fetch packages. Please try again.");
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const refreshServices = () => {
    getPackages();
  };

  return (
    <>
      <div className=" flex flex-col flex-1">
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl font-semibold font-judson">
            Packages Manager
          </h1>
          <ServiceModal side="bottom" type="new" onRefresh={refreshServices}>
            <Button>Add New</Button>
          </ServiceModal>
        </div>

        <div className=" flex-1 mt-8"></div>
      </div>
    </>
  );
};

export default PackagesManager;
