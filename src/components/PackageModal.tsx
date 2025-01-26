import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cloud } from "lucide-react";
import { ReactNode, useState } from "react";
import { uploadImage } from "@/utils/imageUpload";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

type Side = "top" | "bottom" | "left" | "right";

interface PackageModalProps {
  side: Side;
  children: ReactNode;
  type?: string;
  packageData?: {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  };
  onRefresh?: () => void;
}

export const PackageModal = ({
  children,
  side,
  type,
  packageData,
  onRefresh,
}: PackageModalProps) => {
  const [imgUrl, setImageUrl] = useState(packageData?.imageUrl || "");
  const [title, setTitle] = useState(packageData?.title || "");
  const [price, setPrice] = useState(packageData?.price || 0);
  const [description, setDescription] = useState(
    packageData?.description || ""
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetch } = useAxios();

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload an image file (JPEG, PNG, GIF, WEBP)");
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      // 50MB
      setError("File size should be less than 50MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setLoading(true);
      try {
        const url = await uploadImage(file);
        setImageUrl(url);
        setError("");
      } catch {
        setError("Failed to upload the image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setLoading(true);
      try {
        const url = await uploadImage(file);
        setImageUrl(url);
        setError("");
      } catch {
        setError("Failed to upload the image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  const handleSave = async () => {
    if (!imgUrl) {
      setError("Please upload an image");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (price <= 0) {
      setError("Please enter a valid price");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    if (type === "new") {
      // Add new package
      try {
        setIsLoading(true);
        const { data } = await fetch({
          url: "/api/packages",
          method: "POST",
          data: {
            imageUrl: imgUrl,
            title,
            price,
            description,
          },
        });
        if (data.success) {
          setImageUrl("");
          setTitle("");
          setPrice(0);
          setDescription("");
          toast.success(data.message || "Package added successfully");
          if (onRefresh) {
            onRefresh();
          }
        } else {
          throw new Error(data.message || "Failed to add package");
        }
      } catch (error) {
        console.error("Error adding package:", error);
        toast.error("Failed to add package. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "edit") {
      // Edit package
      try {
        setIsLoading(true);
        const { data } = await fetch({
          url: `/api/packages/${packageData?.id}`,
          method: "PUT",
          data: {
            imageUrl: imgUrl,
            title,
            price,
            description,
          },
        });
        if (data.success) {
          setImageUrl(data.data.imageUrl);
          setTitle(data.data.title);
          setPrice(data.data.price);
          setDescription(data.data.description);
          toast.success(data.message || "Package updated successfully");
          if (onRefresh) {
            onRefresh();
          }
        } else {
          throw new Error(data.message || "Failed to update package");
        }
      } catch (error) {
        console.error("Error updating package:", error);
        toast.error("Failed to update package. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>{children}</ResponsiveModalTrigger>
      <ResponsiveModalContent side={side}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            {type === "new" ? "Add New Package" : "Edit Package"}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription></ResponsiveModalDescription>
          <div className="grid gap-4 py-4">
            {/* Image upload */}
            {/* ... (same as before) */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              ${imgUrl ? "bg-gray-50" : "hover:bg-gray-50"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imgUrl ? (
                <div className="relative">
                  <img
                    src={imgUrl}
                    alt="Uploaded Preview"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Cloud className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="text-sm text-gray-600">
                    Choose an image or drag & drop it here
                  </div>
                  <div className="text-xs text-gray-500">
                    JPEG, PNG, GIF, WEBP formats up to 50MB
                  </div>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*"
                id="file-upload"
              />
              {!imgUrl && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Browse File
                </Button>
              )}
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {loading && (
              <div className="text-blue-500 text-sm">Uploading...</div>
            )}

            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Save button */}
            <Button
              onClick={handleSave}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
