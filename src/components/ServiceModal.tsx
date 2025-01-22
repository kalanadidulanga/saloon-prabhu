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

interface ServiceModalProps {
  side: Side;
  children: ReactNode;
  type?: string;
  serviceData?: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  };
  onRefresh?: () => void;
}

export const ServiceModal = ({
  children,
  side,
  type,
  serviceData,
  onRefresh,
}: ServiceModalProps) => {
  const [imgUrl, setImageUrl] = useState(serviceData?.imageUrl || "");
  const [title, setTitle] = useState(serviceData?.title || "");
  const [description, setDescription] = useState(
    serviceData?.description || ""
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

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    if (type === "new") {
      // Add new service
      try {
        setIsLoading(true);
        const { data } = await fetch({
          url: "/api/services",
          method: "POST",
          data: {
            imgUrl,
            title,
            description,
          },
        });
        if (data.success) {
          //   console.log(data.data);
          setImageUrl("");
          setTitle("");
          setDescription("");
          toast.success(data.message || "Service added successfully");
          if (onRefresh) {
            onRefresh();
          }
        } else {
          throw new Error(data.message || "Failed to fetch school info");
        }
      } catch (error) {
        console.error("Error fetching school info:", error);
        toast.error("Failed to fetch school info. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "edit") {
      // Edit service
      try {
        setIsLoading(true);
        const { data } = await fetch({
          url: `/api/services/${serviceData?.id}`,
          method: "PUT",
          data: {
            imgUrl,
            title,
            description,
          },
        });
        if (data.success) {
          //   console.log(data.data);
          setImageUrl(data.data.imgUrl);
          setTitle(data.data.title);
          setDescription(data.data.description);
          toast.success(data.message || "Service added successfully");
          if (onRefresh) {
            onRefresh();
          }
        } else {
          throw new Error(data.message || "Failed to fetch school info");
        }
      } catch (error) {
        console.error("Error fetching school info:", error);
        toast.error("Failed to fetch school info. Please try again.");
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
            {type === "new" ? "Add new " : "Edit "}Service
          </ResponsiveModalTitle>
          <ResponsiveModalDescription></ResponsiveModalDescription>
          <div className="grid gap-4 py-4">
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

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

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
