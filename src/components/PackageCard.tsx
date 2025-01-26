import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageModal } from "@/components/PackageModal";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";

const PackageCard = ({
  id,
  imageUrl,
  title,
  price,
  description,
  imageAlt = "Package image",
  className = "",
  onRefresh,
}: {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
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

        await fetch({
          url: `/api/packages/${id}`,
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
    <div
      className={`w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Image Section */}
        <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Title</label>
              <div className="text-lg font-medium text-gray-900">{title}</div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <div className="text-lg font-medium text-gray-900">
                {new Intl.NumberFormat("sri-LK", {
                  style: "currency",
                  currency: "LKR",
                }).format(price)}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <div className="text-gray-700">{description}</div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deletePackage(id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>

            <PackageModal
              side="right"
              type="edit"
              packageData={{ imageUrl, title, price, description, id }}
              onRefresh={() => onRefresh && onRefresh()}
            >
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </PackageModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
