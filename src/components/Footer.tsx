import { Link } from "react-router";
import { Facebook, Instagram, Phone } from "lucide-react";
import { NAVIGATIONS } from "@/constants";
import Title from "./Title";

const Footer = () => {
  return (
    <footer className="bg-bg-color bg-cover bg-center bg-no-repeat py-16 px-4 md:px-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-judson text-white">Saloon Prabhu</h2>
            <p className="text-primary-bg text-sm leading-relaxed">
              Style and confidence go hand in hand, creating beauty that
              inspires and empowers everyone.
            </p>

            {/* Open Hours */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-bg">
                Open Hours
              </h3>
              <p className="text-sm text-white">
                Monday - Saturday : 10 AM - 07 PM
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link
                to="#"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                to="#"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                to="#"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm hover:bg-gray-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pages Links */}
          <div className="space-y-4">
            <Title title={"PAGES"} align="left" className="" />
            <ul className="space-y-3">
              {NAVIGATIONS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div className="space-y-4">
            <Title title={"POLICIES"} align="left" className="" />
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Cancellation Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ & | /g, "-")}`}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <Title title={"GET IN TOUCH"} align="left" className="" />
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">
                Prabhu Salon,
                <br />
                Your Street Name, City,
                <br />
                State, ZIP Code
              </li>
              <li className="text-sm text-gray-600">
                Phone: Your Phone Number
              </li>
              <li className="text-sm text-gray-600">
                Email: Your Email Address
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
