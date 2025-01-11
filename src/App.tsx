import { Route, Routes } from "react-router";
import HomePage from "@/pages/home/HomePage";
import RootLayout from "./layouts/RootLayout";
import AboutPage from "./pages/about/AboutPage";
import ServicesPage from "./pages/services/ServicesPage";
import ContactPage from "./pages/contact/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
