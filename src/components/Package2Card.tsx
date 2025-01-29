import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";
import { PackageModal } from "./PackageModal2";

const Package2Card = ({
  id,
  imageUrl,
  title,
  imageAlt = "Package image",
  className = "",
  onRefresh,
}: {
  id: number;
  imageUrl: string;
  title: string;
  imageAlt?: string;
  className?: string;
  onRefresh?: () => void;
}) => {
  const { fetch } = useAxios();

  const deletePackage = async (id: number) => {
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
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the package.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const { data } = await fetch({
          url: `/api/package2/${id}`,
          method: "DELETE",
        });

        Swal.fire({
          title: "Deleted!",
          text: "The package has been successfully deleted.",
          icon: "success",
        });

        if (onRefresh) {
          onRefresh();
        }
      } catch (error) {
        console.error("Error deleting package:", error);
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
      <PackageModal
        side="bottom"
        type="edit"
        packageData={{ imageUrl, title, id }}
        onRefresh={() => onRefresh && onRefresh()}
      >
        <Button
          className="absolute right-6 top-6 z-10 bg-white border"
          size={"icon"}
          variant={"ghost"}
        >
          <Edit />
        </Button>
      </PackageModal>

      <Button
        className="absolute left-6 top-6 z-10"
        size={"icon"}
        variant={"destructive"}
        onClick={() => deletePackage(id)}
      >
        <Trash2 />
      </Button>

      <div className="bg-white rounded-md p-4 text-center shadow-md">
        <div className="relative inset-x-0 w-full aspect-square mx-auto mb-5">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-md font-medium text-gray-900 mb-4 tracking-wide">
          {title || "Title"}
        </h3>
      </div>
    </div>
  );
};

export default Package2Card;
