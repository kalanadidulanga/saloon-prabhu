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

      // Validate and transform image URLs if needed
      console.log(response.data.data);
      const processedData = response.data.data;

      setServices(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Initialize turn.js after component mount
    const initializeFlipbook = () => {
      if (window.$ && window.$(".flipbook").turn) {
        const flipbook = window.$(".flipbook");

        // Destroy existing instance if any
        if (flipbook.data()?.turn) {
          flipbook.turn("destroy");
        }

        // Initialize with new settings
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

    // Wait for both jQuery and turn.js to be fully loaded
    const checkDependencies = setInterval(() => {
      if (window.$ && window.$(".flipbook").turn) {
        clearInterval(checkDependencies);
        initializeFlipbook();
      }
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(checkDependencies);
      const flipbook = window.$?.(".flipbook");
      if (flipbook?.data()?.turn) {
        flipbook.turn("destroy");
      }
    };
  }, []);

  // Handle window resize
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

  return (
    <div className=" bg-Color/60 py-24">
      <div className=" container overflow-hidden">
        {isLoading && (
          <div className="text-center text-lg text-gray-700 my-4">
            Loading Flipbook...
          </div>
        )}

        {/* Title Component */}
        <Title title="PRICE RANGE" align="center" />

        {/* Subheading */}
        <h2 className="text-3xl md:text-4xl font-judson mt-5 mb-16 text-center text-gray-800">
          Service fees for your beauty and body care
        </h2>

        {/* <div className="flex justify-center items-center overflow-hidden"> */}
        <div
          className="flipbook-container w-full h-full  grid place-content-center"
          style={{ visibility: isLoading ? "hidden" : "visible" }}
        >
          <div className="flipbook mx-auto">
            {/* Cover */}
            <div className=" hard bg-[url('/textures/book-cover.jpg')] bg-white bg-center bg-cover">
              {/* <small className="text-4xl font-bold mb-4">Salon Prabhu</small> */}
              {/* <p className="italic opacity-80">~ HankTheTank</p> */}
            </div>

            {/* <div className=" hard bg-[url('/textures/book-back.jpg')] bg-center bg-cover" /> */}

            {/* Pokemon Pages */}
            {/* {[
              { img: "img-1.png", name: "Charmander" },
              { img: "img-2.png", name: "Arbok" },
              { img: "img-3.png", name: "Pikachu" },
              { img: "img-4.png", name: "Mew" },
              { img: "img-5.png", name: "Darkrai" },
            ].map((pokemon, index) => (
              <>
                <div
                  key={index + 1}
                  className=" bg-white border border-gray-200 p-5 flex justify-center items-center"
                >
                  <img
                    src={`/images/${pokemon.img}`}
                    alt={pokemon.name}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Pokemon";
                    }}
                  />
                </div>
                <div
                  key={index + 2}
                  className=" bg-white border border-gray-200"
                >
                  <small className="text-gray-600 text-sm mt-4">
                    {pokemon.name}
                  </small>
                </div>
              </>
            ))} */}

            {services.length > 0 &&
              services.map((service, index) => (
                <>
                  <div
                    key={index}
                    className=" bg-white border border-gray-200 p-5 flex justify-center items-center"
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=Pokemon";
                      }}
                    />
                  </div>
                  <div
                    key={service.id}
                    className=" bg-white border border-gray-200"
                  >
                    <h4>{service.title}</h4>
                    <p>{service.price}</p>
                    <small className="text-gray-600 text-sm mt-4">
                      {service.description}
                    </small>
                  </div>
                </>
              ))}

            {/* Back Cover */}
            {/* <div className="  hard bg-[url('/textures/book-back.jpg')] bg-center bg-cover" /> */}
            <div className="  hard bg-[url('/textures/book-back.jpg')] bg-center bg-cover flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">Thank You</h2>
              <small className="italic opacity-80">Salon Prabhu</small>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Flipbook;
