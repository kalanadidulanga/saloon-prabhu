import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cloud } from "lucide-react";
import { useState, ReactNode } from "react";

type Side = "top" | "bottom" | "left" | "right";

interface ClientModalProps {
  side: Side;
  children: ReactNode;
  type?: string;
}

export const ClientModal = ({ children, side, type }: ClientModalProps) => {
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload an image file (JPEG, PNG, GIF, WEBP)");
      return false;
    }
    if (file.size > 1 * 1024 * 1024) {
      // 1MB
      setError("File size should be less than 1MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!imagePreview) {
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
    // Handle save logic here
    console.log({ imagePreview, title, description });
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>{children}</ResponsiveModalTrigger>
      <ResponsiveModalContent side={side}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Add new Client</ResponsiveModalTitle>
          <div className="grid gap-4 py-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              ${imagePreview ? "bg-gray-50" : "hover:bg-gray-50"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded-lg"
                />
              ) : (
                <div className="space-y-2">
                  <Cloud className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="text-sm text-gray-600">
                    Choose an image or drag & drop it here
                  </div>
                  <div className="text-xs text-gray-500">
                    JPEG, PNG, GIF, WEBP formats up to 1MB
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
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Browse File
              </Button>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

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
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              Save changes
            </Button>
          </div>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
