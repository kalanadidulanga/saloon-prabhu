import React from "react";
import { Link, useLocation } from "react-router";
import {
  Clock,
  Grid,
  Heart,
  MessageSquare,
  List,
  RectangleVerticalIcon,
  StampIcon,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-5 text-sm font-medium duration-300 transition-all h-12"
    >
      <div
        className={`border-r-[6px] border-my-blue h-full rounded-r-full ${
          isActive ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={`flex items-center gap-3 w-full h-full rounded-md px-5 ${
          isActive ? "bg-my-blue text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/dashboard",
      icon: <Clock className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/services-manager",
      icon: <Grid className="w-5 h-5" />,
      label: "Services",
    },
    {
      to: "/dashboard/packages-manager",
      icon: <Heart className="w-5 h-5" />,
      label: "Packages",
    },
    {
      to: "/dashboard/client",
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Client",
    },
    {
      to: "/dashboard/reviews-manager",
      icon: <StampIcon className="w-5 h-5" />,
      label: "Reviews",
    },
    {
      to: "/dashboard/appointments-manager",
      icon: <List className="w-5 h-5" />,
      label: "Appointments",
    },
  ];

  return (
    <div className="w-64 h-full py-3 bg-white border-r border-gray-200">
      <div className="flex flex-col gap-y-1 pe-8">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
