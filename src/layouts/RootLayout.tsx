import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 md:pt-30 lg:pt-34">
        {/* <div className=" border-2 border-red-500"> */}
        <Outlet />
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
