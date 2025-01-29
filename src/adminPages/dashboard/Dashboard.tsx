import Package2Card from "@/components/Package2Card";
import { PackageModal } from "@/components/PackageModal2";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const { fetch, loading } = useAxios();

  const getPackages = async () => {
    try {
      const { data } = await fetch({
        url: "/api/package2",
        method: "GET",
      });
      if (data.success) {
        // console.log(data.data);
        setPackages(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch Clients");
      }
    } catch (error) {
      console.error("Error fetching Clients:", error);
      toast.error("Failed to fetch Clients. Please try again.");
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const refreshPackages = () => {
    getPackages();
  };
  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Packages</h1>
        <PackageModal side="bottom" type="new" onRefresh={refreshPackages}>
          <Button>Add New</Button>
        </PackageModal>
      </div>

      <div className="flex-1 mt-8">
        {loading && (
          <div className="flex items-center justify-center w-full mb-8">
            <Loader2 className="mr-2 animate-spin" /> <span>Loading...</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {packages.length > 0 &&
            packages.map((pkg: any, index: number) => {
              return (
                <Package2Card
                  key={index}
                  imageUrl={pkg.imageUrl}
                  id={pkg.id}
                  title={pkg.title}
                  imageAlt={pkg.title}
                  onRefresh={refreshPackages}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
