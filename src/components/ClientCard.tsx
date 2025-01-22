import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
// import { ServiceModal } from "./ServiceModal";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";
import { ClientModal } from "./ClientModal";

const ClientCard = ({
  id,
  imageUrl,
  name,
  description,
  imageAlt = "Service image",
  className = "",
  onRefresh,
}: {
  id: number;
  imageUrl: string;
  name: string;
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
          text: "Please wait while we delete the client.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Call your custom hook's fetch function
        const { data } = await fetch({
          url: `/api/clients/${id}`,
          method: "DELETE",
        });

        console.log(data);

        Swal.fire({
          title: "Deleted!",
          text: "The client has been successfully deleted.",
          icon: "success",
        });
        // Optional: Add any logic to refresh data or update the UI
        if (onRefresh) {
          onRefresh();
        }
      } catch (error) {
        console.error("Error deleting client:", error);
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
      <ClientModal
        side="bottom"
        type="edit"
        clientData={{ imageUrl, name, description, id }}
        onRefresh={() => onRefresh && onRefresh()}
      >
        <Button
          className="absolute right-6 top-6 z-10 bg-white border"
          size={"icon"}
          variant={"ghost"}
        >
          <Edit />
        </Button>
      </ClientModal>

      <Button
        className="absolute left-6 top-6 z-10"
        size={"icon"}
        variant={"destructive"}
        onClick={() => deleteService(id)}
      >
        <Trash2 />
      </Button>

      {/* Content with light blue background */}
      <div className="bg-white rounded-md p-4 text-center shadow-md">
        {/* Image Container */}
        <div className="relative inset-x-0 w-full aspect-square mx-auto mb-5">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-md font-medium text-gray-900 mb-4 uppercase tracking-wide">
          {name || "Name"}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
