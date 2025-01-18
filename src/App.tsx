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
import Login from "./auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes - RootLayout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="services-manager" element={<ServicesManager />} />
          <Route path="packages-manager" element={<PackagesManager />} />
          <Route path="client" element={<Client />} />
          <Route
            path="appointments-manager"
            element={<AppointmentsManager />}
          />
        </Route>

        {/* Public only route - redirects to dashboard if authenticated */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
