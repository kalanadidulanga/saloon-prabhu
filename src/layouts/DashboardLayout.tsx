import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className=" flex flex-col flex-1 w-full h-dvh min-h-dvh max-h-dvh overflow-clip">
      <AdminHeader
        sidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 flex relative">
        <div
          className={`
            fixed lg:relative
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            transition-transform duration-300 ease-in-out
            z-30 h-[calc(100vh-64px)]
          `}
        >
          <SideBar />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 overflow-y-auto p-5 bg-[#F5F6FA] relative max-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
