import { ClientModal } from "@/components/ClientModal";
import { Button } from "@/components/ui/button";

const Client = () => {
  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Clients Manager</h1>
        <ClientModal side="bottom">
          <Button>Add New</Button>
        </ClientModal>
      </div>
    </div>
  );
};

export default Client;
