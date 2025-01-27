import React, { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import useAxios from "@/hooks/useAxios";

// Service type definition
type Service = {
  image: string;
  title: string;
  price: string;
  description: string;
};

const AntiqueBook: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { fetch } = useAxios();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch({
        url: "/api/packages",
        method: "GET",
      });

      // Validate and transform image URLs if needed
      const processedData = response.data.data;

      setServices(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [fetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (currentPage < services.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add swipe gestures
  const bind = useGesture({
    onDrag: ({ direction: [xDir], velocity }) => {
      const triggerSwipe = Math.abs(velocity[0]) > 0.5;
      if (triggerSwipe) {
        if (xDir < 0) nextPage(); // Swipe left
        if (xDir > 0) prevPage(); // Swipe right
      }
    },
  });

  const LeftPageImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    return (
      <mesh>
        <planeGeometry args={[4, 5.5]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  };

  const RightPageContent: React.FC<{
    title: string;
    price: string;
    description: string;
  }> = ({ title, price, description }) => {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-lg text-gray-700">Price: {price}</p>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      {...bind()} // Bind swipe gestures to the container
    >
      <h1 className="text-2xl font-bold mb-4">Service Price Range</h1>
      <Canvas style={{ width: "100%", height: "70%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <group position={[-2.5, 0, 0]}>
          {/* Left Page */}
          {services[currentPage]?.image && (
            <LeftPageImage imageUrl={services[currentPage].image} />
          )}
        </group>

        <group position={[2.5, 0, 0]}>
          {/* Right Page */}
          {services[currentPage] && (
            <mesh>
              <planeGeometry args={[4, 5.5]} />
              <meshStandardMaterial color="#f5deb3" />
            </mesh>
          )}
        </group>

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="flex mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-800 text-white rounded-l-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700"
        >
          Next
        </button>
      </div>

      <div className="absolute top-0 right-0 p-4">
        {services[currentPage] && (
          <RightPageContent
            title={services[currentPage].title}
            price={services[currentPage].price}
            description={services[currentPage].description}
          />
        )}
      </div>
    </div>
  );
};

export default AntiqueBook;
