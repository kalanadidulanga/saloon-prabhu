import { ServiceModal } from "@/components/ServiceModal";
import { Button } from "@/components/ui/button";

const PackagesManager = () => {
  return (
    <>
      <div className=" flex flex-col flex-1">
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl font-semibold font-judson">
            Services Manager
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
