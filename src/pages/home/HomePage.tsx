import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <>
      <div className="container flex flex-col lg:flex-row py-24">
        <div className="w-full flex flex-col lg:flex-row border-2 border-red-500">
          <div className=" flex flex-col w-full">
            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-judson">
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
              className="mt-16 mr-auto"
              asChild
            >
              <Link to={"../about"}>Learn more</Link>
            </Button>
          </div>
          <div className=" w-full border-2 border-blue-500 relative flex justify-end">
            <img src="/assets/hero2.png" className=" w-full max-w-lg" />
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
