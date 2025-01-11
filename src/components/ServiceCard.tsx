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
      <div className=" absolute inset-x-0 w-40 h-40 mx-auto">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content with light blue background */}
      <div className="bg-[#F5F9FF] rounded-md mt-20 pt-28 px-10 pb-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
