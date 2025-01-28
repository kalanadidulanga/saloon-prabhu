import React, { useEffect, useState } from "react";

const Flipbook = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {isLoading && (
          <div className="text-center text-lg text-gray-700 mb-4">
            Loading Flipbook...
          </div>
        )}

        <div className="flex justify-center items-center overflow-hidden">
          <div
            className="flipbook-container"
            style={{ visibility: isLoading ? "hidden" : "visible" }}
          >
            <div className="flipbook">
              {/* Cover */}
              <div className="bg-red-700 text-white p-8 flex flex-col justify-center items-center text-center shadow-lg border-2 border-black">
                <h1 className="text-4xl font-bold mb-4">My Pokemon Gallery</h1>
                <p className="italic opacity-80">~ HankTheTank</p>
              </div>

              <div className="bg-red-700 shadow-lg border-2 border-black" />

              {/* Introduction */}
              <div className="bg-white p-8 flex flex-col justify-center items-center text-center shadow-md">
                <p className="text-xl text-gray-700 font-medium mb-4">
                  Let's Look At Some Amazing Pokemon ❤️
                </p>
                <p className="text-lg text-gray-600">Gotta Catch 'Em All</p>
              </div>

              {/* Pokemon Pages */}
              {[
                { img: "img-1.png", name: "Charmander" },
                { img: "img-2.png", name: "Arbok" },
                { img: "img-3.png", name: "Pikachu" },
                { img: "img-4.png", name: "Mew" },
                { img: "img-5.png", name: "Darkrai" },
              ].map((pokemon, index) => (
                <div
                  key={index}
                  className="bg-white p-8 flex flex-col justify-center items-center text-center shadow-md"
                >
                  <div className="w-4/5 relative mb-4">
                    <img
                      src={`/images/${pokemon.img}`}
                      alt={pokemon.name}
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=Pokemon";
                      }}
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-4">{pokemon.name}</p>
                </div>
              ))}

              {/* Back Cover */}
              <div className="bg-red-700 shadow-lg border-2 border-black" />
              <div className="bg-red-700 text-white p-8 flex flex-col justify-center items-center text-center shadow-lg border-2 border-black">
                <h2 className="text-3xl font-bold mb-4">Thank You</h2>
                <p className="italic opacity-80">~ HankTheTank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
