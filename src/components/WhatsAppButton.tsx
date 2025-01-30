import React from 'react';
import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaYoutube, 
  FaTiktok, 
  FaInstagram 
} from "react-icons/fa";
import { IconType } from 'react-icons';
import useContactDetailsStore from '@/stores/contactdetailsStore';

interface SocialLinks {
  whatsapp: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  instagram: string;
}

interface SocialButton {
  icon: IconType;
  color: string;
  hoverColor: string;
  onClick: () => void;
  platform: keyof SocialLinks;
}

const SocialMediaButtons: React.FC = () => {
  const { facebook, youtube, tiktok, instagram } =
    useContactDetailsStore();

  const socialLinks: SocialLinks = {
    whatsapp: "+94752223322", // Replace with actual WhatsApp number
    facebook: facebook, // Replace with actual Facebook URL
    youtube: youtube, // Replace with actual YouTube URL
    tiktok: tiktok, // Replace with actual TikTok URL
    instagram: instagram // Replace with actual Instagram URL
  };

  const handleWhatsAppClick = (): void => {
    window.open(`https://wa.me/${socialLinks.whatsapp}`, "_blank");
  };

  const handleSocialClick = (platform: keyof SocialLinks): void => {
    window.open(socialLinks[platform], "_blank");
  };

  // Button configurations for different social media platforms
  const buttons: SocialButton[] = [
    { 
      icon: FaFacebook, 
      color: "bg-blue-500", 
      hoverColor: "hover:bg-blue-600", 
      onClick: () => handleSocialClick('facebook'),
      platform: 'facebook'
    },
    { 
      icon: FaWhatsapp, 
      color: "bg-green-500", 
      hoverColor: "hover:bg-green-600", 
      onClick: handleWhatsAppClick,
      platform: 'whatsapp'
    },
    { 
      icon: FaYoutube, 
      color: "bg-red-500", 
      hoverColor: "hover:bg-red-600", 
      onClick: () => handleSocialClick('youtube'),
      platform: 'youtube'
    },
    { 
      icon: FaTiktok, 
      color: "bg-gray-700", 
      hoverColor: "hover:bg-gray-800", 
      onClick: () => handleSocialClick('tiktok'),
      platform: 'tiktok'
    },
    { 
      icon: FaInstagram, 
      color: "bg-pink-500", 
      hoverColor: "hover:bg-pink-600", 
      onClick: () => handleSocialClick('instagram'),
      platform: 'instagram'
    }
  ];

  const buttonVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  const buttonTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 md:m-6 lg:m-8 z-50">
      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 ">
        {buttons.map((button, index) => (
          <motion.button
            key={button.platform}
            onClick={button.onClick}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{
              ...buttonTransition,
              delay: index * 0.1
            }}
            className={`${button.color} ${button.hoverColor} 
              text-white rounded-full shadow-lg z-50 
              focus:outline-none flex items-center justify-center
              w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
              transition-colors duration-200`}
            aria-label={`Connect on ${button.platform}`}
          >
            <button.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaButtons;