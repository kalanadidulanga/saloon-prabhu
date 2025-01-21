import { Edit } from "lucide-react";
import { Button } from "./ui/button";

const ServiceCard = ({
  imageUrl,
  title,
  description,
  imageAlt = "Service image",
  className = "",
}: {
  imageUrl: string;
  title: string;
  description: string;
  imageAlt?: string;
  className?: string;
}) => {
  return (
    <div className={`max-w-md mx-auto relative ${className}`}>
      {/* Image Container */}
      <div className=" absolute inset-x-0 w-32 h-32 mx-auto">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Button
        className="absolute right-4 top-24"
        size={"icon"}
        variant={"ghost"}
      >
        <Edit />
      </Button>

      {/* Content with light blue background */}
      <div className="bg-white rounded-md mt-20 pt-20 px-10 pb-8 text-center shadow-md">
        <h3 className="text-md font-medium text-gray-900 mb-4 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
