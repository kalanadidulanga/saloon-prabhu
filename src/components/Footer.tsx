import { Link } from "react-router";
import { Facebook, Instagram } from "lucide-react";
import { NAVIGATIONS } from "@/constants";
import Title from "./Title";
import useContactDetailsStore from "@/stores/contactdetailsStore";
import { FaWhatsapp } from "react-icons/fa";

import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
  const {
    address,
    phone,
    phone2,
    email,
    instagram,
    facebook,
    whatsapp,
    tiktok,
  } = useContactDetailsStore();

  return (
    <footer className="bg-bg-color bg-cover bg-center bg-no-repeat pt-16 pb-8 px-4 md:px-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6 md:col-span-2">
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
                to={facebook}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm border-2 border-primary hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                to={instagram}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm border-2 border-primary hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                to={whatsapp}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm border-2 border-primary hover:bg-gray-700 transition-colors"
              >
                {/* <Phone className="w-4 h-4" /> */}
                <FaWhatsapp className="w-4 h-4" />
              </Link>
              <Link
                to={tiktok}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center bg-[#2F201A] text-white rounded-sm border-2 border-primary hover:bg-gray-700 transition-colors"
              >
                {/* <Ticktok className="w-4 h-4" /> */}
                <AiFillTikTok className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pages Links */}
          <div className="space-y-4">
            <Title
              title={"PAGES"}
              align="left"
              className=""
              textColor=" text-white"
            />
            <ul className="space-y-3">
              {NAVIGATIONS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-primary-bg hover:text-primary-bg/90 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          {/* <div className="space-y-4">
            <Title
              title={"POLICIES"}
              align="left"
              className=""
              textColor=" text-white"
            />
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Cancellation Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ & | /g, "-")}`}
                    className="text-sm text-primary-bg hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Get in Touch */}
          <div className="space-y-4">
            <Title
              title={"GET IN TOUCH"}
              align="left"
              className=""
              textColor=" text-white"
            />
            <ul className="space-y-3">
              <li className="text-sm text-primary-bg">{address}</li>
              <li className="text-sm text-primary-bg">
                Phone: {phone} | {phone2}
              </li>
              <li className="text-sm text-primary-bg">Email: {email}</li>
            </ul>
          </div>
        </div>

        <div className=" w-full text-center text-Color text-xs mt-12">
          © 2025 Prabhu Salon. All Rights Reserved. Develop by{" "}
          <a
            href="https://fuchsius.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Fuchsius</strong>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
