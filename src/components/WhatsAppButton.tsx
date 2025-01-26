import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+94752223322"; // Replace with your client's WhatsApp number

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10,
      }}
      className="fixed bottom-6 right-6 bg-green-500 text-white 
        p-4 rounded-full shadow-2xl z-50 
        hover:bg-green-600 focus:outline-none 
        flex items-center justify-center"
    >
      <FaWhatsapp size={24} />
    </motion.button>
  );
};

export default WhatsAppButton;
