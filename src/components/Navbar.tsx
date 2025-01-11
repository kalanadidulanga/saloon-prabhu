import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About us", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact us", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-50 backdrop-blur-md ${
        isScrolled ? "bg-nav-color shadow-md" : "bg-nav-color"
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl lg:text-4xl font-normal font-judson text-color-5">
              Saloon Prabhu
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm lg:text-base transition-all duration-200 text-text-color hover:text-text-color/80 ${
                    isActive ? "font-medium" : "font-normal"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}

            {/* Desktop Appointment Button */}
            <Button variant="blue" size="mySize" asChild className="ml-4">
              <Link to="#appointment">MAKE APPOINTMENT</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-text-color"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base transition-all duration-200 text-text-color hover:bg-gray-100 ${
                      isActive ? "font-medium bg-gray-50" : "font-normal"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}

              {/* Mobile Appointment Button */}
              <div className="px-3 pt-2">
                <Button variant="blue" size="mySize" asChild className="w-full">
                  <Link
                    to="#appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    MAKE APPOINTMENT
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
