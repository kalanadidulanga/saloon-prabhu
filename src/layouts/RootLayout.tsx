import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 md:pt-[7.5rem] lg:pt-[8.5rem]">
        {/* <div className=" border-2 border-red-500"> */}
        <Outlet />
        {/* </div> */}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RootLayout;
