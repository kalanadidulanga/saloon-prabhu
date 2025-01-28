import { useEffect, useState } from "react";
import Title from "./Title";
import useAxios from "../hooks/useAxios";

const Flipbook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const { fetch } = useAxios();

  const fetchData = async () => {
    try {
      const response = await fetch({
        url: "/api/packages",
        method: "GET",
      });
      console.log(response.data.data);
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
    let checkDependenciesInterval;

    const initializeFlipbook = () => {
      if (window.$ && window.$(".flipbook").turn) {
        const flipbook = window.$(".flipbook");

        if (flipbook.data()?.turn) {
          flipbook.turn("destroy");
        }

        flipbook.turn({
          width: 800,
          height: 500,
          autoCenter: true,
          elevation: 50,
          gradients: true,
          duration: 1000,
          display: "double",
          acceleration: true,
          when: {
            turned: function (e, page) {
              console.log("Page turned:", page);
            },
          },
        });

        setIsLoading(false);
      }
    };

    // Only start checking dependencies if services are loaded
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
  }, [services]); // Depend on services to reinitialize when data is loaded

  useEffect(() => {
    const handleResize = () => {
      const flipbook = window.$?.(".flipbook");
      if (flipbook?.data()?.turn) {
        flipbook.turn(
          "size",
          Math.min(800, window.innerWidth - 40),
          Math.min(500, (window.innerWidth - 40) * 0.625)
        );
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
        className="hard bg-[url('/textures/book-cover.jpg')] bg-white bg-center bg-cover flex flex-col justify-center items-center"
      >
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1> */}
        {/* <p className="text-xl text-gray-600">Salon Prabhu</p> */}
      </div>
    );

    // Service Pages
    services.forEach((service, index) => {
      pages.push(
        <div
          key={`image-${service.id}-${index}`}
          className="bg-white border border-gray-200 p-5 flex justify-center items-center"
        >
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x300?text=Service";
            }}
          />
        </div>
      );

      pages.push(
        <div
          key={`details-${service.id}-${index}`}
          className="bg-white border border-gray-200"
        >
          <div className="h-full flex flex-col justify-between p-5">
            <div>
              <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
              <p className="text-gray-600 text-base mb-4">
                {service.description}
              </p>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-4">
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
        className="hard bg-[url('/textures/book-back.jpg')] bg-center bg-cover flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl font-bold mb-4">Thank You</h2>
        <small className="italic opacity-80">Salon Prabhu</small>
      </div>
    );

    return pages;
  };

  return (
    <div className="bg-gray-50/60 py-24">
      <div className="container mx-auto px-4 overflow-hidden">
        {isLoading && (
          <div className="text-center text-lg text-gray-700 my-4">
            Loading Flipbook...
          </div>
        )}

        <Title title="PRICE RANGE" align="center" />

        <h2 className="text-3xl md:text-4xl font-judson mt-5 mb-16 text-center text-gray-800">
          Service fees for your beauty and body care
        </h2>

        <div
          className="flipbook-container w-full h-full grid place-content-center"
          style={{ visibility: isLoading ? "hidden" : "visible" }}
        >
          <div className="flipbook mx-auto">{renderPages()}</div>
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
