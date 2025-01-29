import { useState, useEffect } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface VintageTVSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
  interval?: number;
  width?: number;
  height?: number;
}

export function VintageTVSlider({
  images,
  interval = 3000,
  width = 600,
  height = 450,
  className,
  ...props
}: VintageTVSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Auto-advance the slider
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6">
      <div
        className={cn("relative inline-block w-full", className)}
        style={{
          maxWidth: Math.min(width, window.innerWidth - 32),
        }}
        {...props}
      >
        <div className="relative" style={{ paddingTop: "75%" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Image Slider */}
            {images.length > 0 ? (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] overflow-hidden">
                {images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ))}
              </div>
            ) : (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black flex items-center justify-center">
                <p className="text-gray-500 text-sm">No images available</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black flex items-center justify-center">
                <p className="text-red-500 text-sm">Failed to load image</p>
              </div>
            )}

            {/* TV Frame Image Overlay */}
            <img
              src="/assets/tv.png"
              alt="Vintage TV frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
