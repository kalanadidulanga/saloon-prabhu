import ServiceCard from "@/components/ServiceCard";
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
import { useState } from "react";

type Side = "top" | "bottom" | "left" | "right";

const ServicesManager = () => {
  const SERVICES = [
    {
      imageUrl: "/assets/service1.png",
      title: "Professional Haircuts and Styling",
      description:
        "From timeless, classic cuts to trendy, modern styles, we cater to both men and women. Whether you're looking for a sharp professional look, a casual everyday style, or a bold new transformation, our expert stylists tailor each cut to suit your personality and preferences. We ensure you leave with a style that enhances your unique features and confidence.",
    },
    {
      imageUrl: "/assets/service2.png",
      title: "Bridal and Event Makeup",
      description:
        "Create unforgettable memories with our glamorous makeup and hairstyling services for weddings, parties, and special occasions. From natural, elegant looks to bold, head-turning styles, we customize each look to suit your outfit, theme, and personality. Our expert team ensures long-lasting, flawless results that keep you radiant throughout your special day.",
    },
    {
      imageUrl: "/assets/service3.png",
      title: "Hair Treatments and Coloring",
      description:
        "Revitalize your hair with our luxurious hair spa treatments, designed to nourish and strengthen your locks. Our keratin treatments restore smoothness and shine, leaving your hair frizz-free and manageable. Explore our customized hair color services, from subtle highlights to bold transformations, all tailored to enhance your unique style and personality.",
    },
  ];

  return (
    <div className=" flex flex-col flex-1">
      <div className=" flex items-center justify-between">
        <h1 className=" text-xl font-semibold font-judson">Services Manager</h1>
        <Modal side="bottom" />
      </div>

      <div className=" flex-1 mt-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICES.length > 0 &&
            SERVICES.map((service: any) => {
              return (
                <ServiceCard
                  key={service.title}
                  imageUrl={service.imageUrl}
                  title={service.title}
                  description={service.description}
                  imageAlt={service.title}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ side }: { side: Side }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file: any) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload an image file (JPEG, PNG, GIF, WEBP)");
      return false;
    }
    if (file.size > 1 * 1024 * 1024) {
      // 1MB
      setError("File size should be less than 50MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleFileSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
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
    // Handle save logic here
    console.log({ imagePreview, title, description });
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button>Add New</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side={side}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Add new Service</ResponsiveModalTitle>
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
                onChange={(e: any) => setDescription(e.target.value)}
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

export default ServicesManager;
