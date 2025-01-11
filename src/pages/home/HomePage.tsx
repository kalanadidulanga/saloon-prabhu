import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <>
      <div className="container flex flex-col lg:flex-row py-24">
        <div className="w-full flex flex-col lg:flex-row">
          <div className=" flex flex-col w-full">
            <h1 className="text-5xl md:text-6xl font-judson">
              Get the hair you’ve been <br />
              dreaming about
            </h1>
            <p className=" text-text-color mt-6">
              Hair and beauty studio,{" "}
              <span className="font-bold">Unisex saloon</span>
            </p>
            <Button
              variant={"black"}
              size={"mySize"}
              className="mt-16 mr-auto tracking-wider"
              asChild
            >
              <Link to={"../about"} className=" capitalize font-normal">
                LEARN MORE
              </Link>
            </Button>
          </div>
          <div className=" w-full relative flex justify-end mt-8 lg:mt-0">
            <img src="/assets/hero2.png" className=" w-full max-w-md" />
          </div>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row py-24">
        <div className="w-full flex flex-col lg:flex-row gap-16">
          <div className=" w-full relative flex justify-start mb-8 lg:mb-0">
            <img src="/assets/home2.png" className=" w-full max-w-md" />
          </div>
          <div className=" flex flex-col w-full">
            <div className="flex flex-col gap-1 mr-auto">
              <p className=" capitalize text-color-5 text-lg pr-8 tracking-wider">
                ABOUT
              </p>
              <div className=" border-2 border-color-3" />
            </div>
            <h1 className="text-3xl md:text-4xl font-judson my-8">
              Get the Hair You’ve Been Dreaming About, With Care
            </h1>
            <p className=" text-text-color">
              At Saloon Prabhu, we bring elegance to life with care, Our expert
              stylists ensure you leave looking and feeling your best. From
              classic cuts to modern styles, we craft each look to match your
              unique beauty. Let us make every visit a delightful experience.
            </p>
            <Button
              variant={"black"}
              size={"mySize"}
              className="mt-16 mr-auto tracking-wider"
              asChild
            >
              <Link to={"../about"} className=" capitalize font-normal">
                LEARN MORE
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className=" container">
        <div>
          <Button variant={"blue"} size={"mySize"}>
            Click me
          </Button>
        </div>

        <div className=" my-4">
          <h1 className="text-rose-500 font-judson text-2xl">
            Welcome to Tailwind Custom Setup!
          </h1>
          <p className="text-blue-500 font-inter text-lg font-bold">
            This text uses the Inter font with blue color.
          </p>
          <button className="bg-yellow-500 text-black-900 font-bold py-2 px-4 rounded-md">
            Click Me
          </button>
        </div>
      </div>
      <div className=" bg-rose-500 min-h-screen"></div>
    </>
  );
};

export default HomePage;
