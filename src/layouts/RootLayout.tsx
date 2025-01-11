import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
