import ClientCard from "@/components/ClientCard";
import { ClientModal } from "@/components/ClientModal";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Client = () => {
  const [clients, setClients] = useState([]);
  const { fetch } = useAxios();

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

  const refreshServices = () => {
    getClients();
  };

  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Clients Manager</h1>
        <ClientModal side="bottom" type="new" onRefresh={refreshServices}>
          <Button>Add New</Button>
        </ClientModal>
      </div>

      <div className=" flex-1 mt-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {clients.length > 0 &&
            clients.map((client: any, index: number) => {
              return (
                <ClientCard
                  key={index}
                  imageUrl={client.imgUrl}
                  id={client.id}
                  name={client.name}
                  description={client.description}
                  imageAlt={client.title}
                  onRefresh={refreshServices}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Client;
