import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection2 = () => {
  // Array of background images for the slider
  const backgroundImages = [
    "/assets/herobg.jpg",
    "/assets/herobg2.jpg",
    "/assets/herobg3.jpg", // Add more background images here
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    // Auto-play slider logic
    const slideInterval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change background every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div
      className="bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container flex flex-col lg:min-h-[calc(100vh-96px)] justify-center py-32">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex flex-col w-full motion-preset-slide-right">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-center md:text-start font-judson text-white">
              Get the hair you've been <br />
              dreaming about
            </h1>
            <p className="text-white mt-6 text-center md:text-start">
              Hair and beauty studio,{" "}
              <span className="font-bold">Unisex salon</span>
            </p>

            <div className=" flex items-center justify-center md:justify-start">
              <Button
                variant={"blue2"}
                size={"mySize"}
                className="mt-16 tracking-wider"
                asChild
              >
                <Link to={"../about"} className="capitalize font-normal">
                  LEARN MORE
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Slider Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBgIndex(index)}
            className={`
              w-3 h-3 rounded-full 
              ${index === currentBgIndex ? "bg-white" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection2;
