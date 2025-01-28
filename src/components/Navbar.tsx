import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { NAVIGATIONS } from "@/constants";
import useContactDetailsStore from "@/stores/contactdetailsStore";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { address, phone, email, instagram, whatsapp } =
    useContactDetailsStore();

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

  const navLinks = NAVIGATIONS;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={` fixed w-full z-50`}>
      <header
        className={` bg-white w-full transition-all duration-100 z-50 backdrop-blur-md ${
          isScrolled ? " -translate-y-16 md:-translate-y-10" : " translate-y-0"
        }`}
      >
        <div className=" container flex flex-col md:flex-row justify-center gap-2 md:gap-0 md:justify-between items-center h-16 md:h-10">
          <div className="flex gap-4 text-bg-color font-medium">
            <div className="items-center text-xs hidden lg:flex">
              <MapPin className="mr-2" size={14} />
              {address}
            </div>
            <div className="flex items-center text-xs">
              <Phone className="mr-2" size={14} />
              {phone}
            </div>
            <div className="flex items-center text-xs">
              <Mail className="mr-2" size={14} />
              {email}
            </div>
          </div>
          <div className="flex gap-4 text-xs items-center font-medium text-bg-color">
            <span>Floow Us On:</span>
            <div className="flex gap-2">
              <Link to={instagram} target="_blank">
                <Instagram size={16} />
              </Link>
              <Link to={whatsapp} target="_blank">
                <Facebook size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <nav
        className={` w-full transition-all duration-100  backdrop-blur-md headerbgimg bg-cover bg-center ${
          isScrolled ? " -translate-y-16 md:-translate-y-10" : " translate-y-0"
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              {/* <span className="text-xl md:text-2xl lg:text-4xl font-normal font-judson text-color-5">
              Saloon Prabhu
            </span> */}
              <div>
                <img
                  src={`/assets/logowhite.svg`}
                  className="w-12 md:w-16 lg:w-20"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm lg:text-base transition-all duration-100 text-white hover:text-white/80 ${
                      isScrolled ? "" : ""
                    }  ${isActive ? "font-bold" : "font-normal"}`
                  }
                >
                  {link.title}
                </NavLink>
              ))}

              {/* Desktop Appointment Button */}
              <Button variant={"blue2"} size="mySize" asChild className="ml-4">
                <Link to="appointment">MAKE APPOINTMENT</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className={`${
                  isScrolled
                    ? "text-text-color "
                    : "text-white hover:text-text-color"
                }`}
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
                      `block px-3 py-2 rounded-md text-base transition-all duration-100 text-white ${
                        isActive
                          ? "font-medium bg-gray-50 !text-text-color"
                          : "font-normal"
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                ))}

                {/* Mobile Appointment Button */}
                <div className="px-3 pt-2">
                  <Button
                    variant={"blue2"}
                    size="mySize"
                    asChild
                    className="w-full"
                  >
                    <Link to="appointment">MAKE APPOINTMENT</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
