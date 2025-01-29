import { useEffect, useState } from "react";
import Title from "./Title";
import useAxios from "../hooks/useAxios";

const Flipbook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const { fetch } = useAxios();

  const calculateDimensions = () => {
    const baseWidth = 800;
    const baseHeight = 500;
    const padding = 40;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let width = Math.min(baseWidth, screenWidth - padding);

    // For very small screens, use single page display
    const isMobile = screenWidth < 768;

    // Maintain aspect ratio
    let height = isMobile
      ? width * 1.5 // Taller aspect ratio for single pages on mobile
      : width * 0.625; // Original aspect ratio for larger screens

    // Ensure height doesn't exceed screen
    if (height > screenHeight - 200) {
      height = screenHeight - 200;
      width = isMobile ? height / 1.5 : height / 0.625;
    }

    return { width, height, isMobile };
  };

  const fetchData = async () => {
    try {
      const response = await fetch({
        url: "/api/packages",
        method: "GET",
      });
      setServices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const initializeFlipbook = () => {
      if (window.$ && window.$(".flipbook").turn) {
        const flipbook = window.$(".flipbook");
        const { width, height, isMobile } = calculateDimensions();

        if (flipbook.data()?.turn) {
          flipbook.turn("destroy");
        }

        flipbook.turn({
          width,
          height,
          autoCenter: true,
          elevation: 50,
          gradients: true,
          duration: 1000,
          display: isMobile ? "single" : "double",
          acceleration: true,
          when: {
            turned: function (e, page) {
              console.log("Page turned:", page);
            },
          },
        });

        setDimensions({ width, height });
        setIsLoading(false);
      }
    };

    let checkDependenciesInterval;
    if (services.length > 0) {
      checkDependenciesInterval = setInterval(() => {
        if (window.$ && window.$(".flipbook").turn) {
          clearInterval(checkDependenciesInterval);
          initializeFlipbook();
        }
      }, 100);
    }

    return () => {
      if (checkDependenciesInterval) {
        clearInterval(checkDependenciesInterval);
      }
      const flipbook = window.$?.(".flipbook");
      if (flipbook?.data()?.turn) {
        flipbook.turn("destroy");
      }
    };
  }, [services]);

  useEffect(() => {
    const handleResize = () => {
      const flipbook = window.$?.(".flipbook");
      if (flipbook?.data()?.turn) {
        const { width, height, isMobile } = calculateDimensions();
        flipbook.turn("display", isMobile ? "single" : "double");
        flipbook.turn("size", width, height);
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPages = () => {
    const pages = [];

    // Front Cover
    pages.push(
      <div
        key="front-cover"
        className="hard bg-[url('/textures/book-cover3.jpg')] bg-white bg-center bg-cover flex flex-col justify-center items-center"
      >
        {/* <div className="text-center p-4 h-full">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Salon Prabhu</p>
        </div> */}
      </div>
    );

    // Service Pages
    services.forEach((service, index) => {
      pages.push(
        <div
          key={`image-${service.id}-${index}`}
          className="bg-white bg-[url('/textures/book-back.jpg')] bg-center bg-cover"
        >
          <div className="p-3 md:p-5 flex justify-center items-center h-full">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x300?text=Service";
              }}
            />
          </div>
        </div>
      );

      pages.push(
        <div
          key={`details-${service.id}-${index}`}
          className="bg-white bg-[url('/textures/book-back.jpg')] bg-center bg-cover"
        >
          <div className="h-full flex flex-col justify-between p-3 md:p-5">
            <div>
              <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                {service.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4">
                {service.description}
              </p>
            </div>
            <p className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4">
              <span className="mr-2">LKR</span>
              {service.price}
            </p>
          </div>
        </div>
      );
    });

    // Back Cover
    pages.push(
      <div
        key="back-cover"
        className="hard bg-[url('/textures/book-back3.jpg')] bg-center bg-cover flex flex-col justify-center items-center"
      >
        {/* <div className="text-center p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Thank You
          </h2>
          <small className="text-sm md:text-base italic opacity-80">
            Salon Prabhu
          </small>
        </div> */}
      </div>
    );

    return pages;
  };

  return (
    <div className="bg-gray-50/60 py-12 md:py-24">
      <div className="container mx-auto px-4 overflow-hidden">
        {isLoading && (
          <div className="text-center text-base md:text-lg text-gray-700 my-4">
            Loading Flipbook...
          </div>
        )}

        <Title title="PRICE RANGE" align="center" />

        <h2 className="text-2xl md:text-4xl font-judson mt-3 md:mt-5 mb-8 md:mb-16 text-center text-gray-800">
          Service fees for your beauty and body care
        </h2>

        <div
          className="flipbook-container w-full h-full grid place-content-center"
          style={{
            visibility: isLoading ? "hidden" : "visible",
            minHeight: dimensions.height,
          }}
        >
          <div className="flipbook mx-auto">{renderPages()}</div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 md:hidden">
          Swipe left or right to turn pages
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
