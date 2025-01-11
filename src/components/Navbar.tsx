// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About us", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-50 ${
        isScrolled
          ? "bg-blue-500/25 backdrop-blur-md shadow-md"
          : "bg-blue-500/25"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">
              Saloon Prabhu
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Appointment Button */}
          <Link
            to="/appointment"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            MAKE APPOINTMENT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
