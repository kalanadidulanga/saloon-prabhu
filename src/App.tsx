import { Route, Routes } from "react-router";
import HomePage from "@/pages/home/HomePage";
import RootLayout from "./layouts/RootLayout";
import AboutPage from "./pages/about/AboutPage";
import ServicesPage from "./pages/services/ServicesPage";
import ContactPage from "./pages/contact/ContactPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./adminPages/dashboard/Dashboard";
import ServicesManager from "./adminPages/services-manager/ServicesManager";
import PackagesManager from "./adminPages/packages-manager/PackagesManager";
import AppointmentsManager from "./adminPages/appointments-manager/AppointmentsManager";
import Client from "./adminPages/client/Client";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services-manager" element={<ServicesManager />} />
        <Route path="packages-manager" element={<PackagesManager />} />
        <Route path="client" element={<Client />} />
        <Route path="appointments-manager" element={<AppointmentsManager />} />
      </Route>
    </Routes>
  );
}

export default App;
