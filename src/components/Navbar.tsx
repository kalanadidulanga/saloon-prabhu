// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "bg-nav-color backdrop-blur-2xl shadow-md" : "bg-nav-color"
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-normal font-judson text-color-5">
              Saloon Prabhu
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-base transition-all duration-200 text-text-color"
                    : "font-normal text-base transition-all duration-200 text-text-color"
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* Appointment Button */}
          <Button variant={"blue"} size={"mySize"} asChild>
            <Link to="#appointment">MAKE APPOINTMENT</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
