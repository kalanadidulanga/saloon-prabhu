import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ServiceModal } from "./ServiceModal";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";

const ServiceCard = ({
  id,
  imageUrl,
  title,
  description,
  imageAlt = "Service image",
  className = "",
  onRefresh,
}: {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  imageAlt?: string;
  className?: string;
  onRefresh?: () => void;
}) => {
  const { fetch } = useAxios();

  const deleteService = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Show a loading alert
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the service.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Call your custom hook's fetch function
        const { data } = await fetch({
          url: `/api/services/${id}`,
          method: "DELETE",
        });

        console.log(data);

        await Swal.fire({
          title: "Deleted!",
          text: "The service has been successfully deleted.",
          icon: "success",
        });
        // Optional: Add any logic to refresh data or update the UI
        if (onRefresh) {
          onRefresh();
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className={`max-w-md w-full mx-auto relative ${className}`}>
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

      <ServiceModal
        side="bottom"
        type="edit"
        serviceData={{ imageUrl, title, description, id }}
        onRefresh={() => onRefresh && onRefresh()}
      >
        <Button
          className="absolute right-4 top-24"
          size={"icon"}
          variant={"ghost"}
        >
          <Edit />
        </Button>
      </ServiceModal>

      <Button
        className="absolute left-4 top-24"
        size={"icon"}
        variant={"destructive"}
        onClick={() => deleteService(id)}
      >
        <Trash2 />
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
