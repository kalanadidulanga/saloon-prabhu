import { LogOutIcon, Menu, X } from "lucide-react";

const AdminHeader = ({
  sidebarOpen,
  setIsSidebarOpen,
}: {
  sidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" flex items-center justify-between h-16 px-3 md:px-5 border-b shadow-md">
      <div className=" flex items-center gap-3">
        <img src="/assets/logo.png" alt="logo" className=" w-10 h-10" />
        <div className=" flex flex-col text-[#202224] font-medium">
          <p className=" text-sm">Salloon Prabhu</p>
          <p className=" text-xs">admin@gmail.com</p>
        </div>
      </div>

      <div className=" flex items-center gap-3">
        <button className=" flex items-center gap-2 text-sm bg-black-900 text-white rounded-md px-2 py-2 font-medium hover:brightness-90">
          <LogOutIcon size={18} />
          <span className=" hidden md:block">Logout</span>
        </button>
        <button
          onClick={() => setIsSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900 lg:hidden"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
