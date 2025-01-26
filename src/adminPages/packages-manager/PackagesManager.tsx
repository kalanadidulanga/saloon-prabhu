import PackageCard from "@/components/PackageCard";
import { PackageModal } from "@/components/PackageModal";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PackagesManager = () => {
  const { fetch, loading } = useAxios();
  const [packages, setPackages] = useState([]);

  const getPackages = async () => {
    try {
      const { data } = await fetch({
        url: "/api/packages",
        method: "GET",
      });
      if (data.success) {
        console.log(data.data);

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
          <PackageModal side="bottom" type="new" onRefresh={refreshServices}>
            <Button>Add New</Button>
          </PackageModal>
        </div>

        <div className=" flex-1 mt-8">
          {loading && (
            <div className=" flex items-center justify-center w-full mb-8">
              <Loader2 className=" mr-2 animate-spin" /> <span>Loading...</span>
            </div>
          )}
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {packages.length > 0 &&
              packages.map((service: any, index: number) => {
                return (
                  <PackageCard
                    key={index}
                    imageUrl={service.imageUrl}
                    price={service.price}
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
    </>
  );
};

export default PackagesManager;
