import Title from "./Title";
// import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { UI } from "./UI";
import { Experience } from "./Experience";

const BookSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto flex flex-col items-center px-4">
        {/* Title Component */}
        <Title title="PRICE RANGE" align="center" />

        {/* Subheading */}
        <h2 className="text-3xl md:text-4xl font-judson my-8 text-center text-gray-800">
          Service fees for your beauty and body care
        </h2>

        {/* Content Wrapper */}
        <div className="w-full flex flex-col items-center justify-center gap-8 relative">
          {/* UI Controls */}
          {/* <div className="w-full"> */}
          <UI />
          {/* </div> */}

          {/* Canvas with 3D Experience */}
          <div
            className="relative w-full lg:w-3/4 h-[600px] lg:h-[700px]"
            aria-label="3D Book Section"
          >
            <Canvas
              shadows
              camera={{
                position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
                fov: 45,
              }}
            >
              <Suspense fallback={null}>
                <Experience />
              </Suspense>
            </Canvas>

            {/* Loader */}
            {/* <Loader /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
