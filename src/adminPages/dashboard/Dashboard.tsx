import { PackageModal } from "@/components/PackageModal2";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const refreshPackages = () => {
    // getClients();
  };
  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Packages</h1>
        <PackageModal side="bottom" type="new" onRefresh={refreshPackages}>
          <Button>Add New</Button>
        </PackageModal>
      </div>

      <div className=" flex-1 mt-8"></div>
    </div>
  );
};

export default Dashboard;
