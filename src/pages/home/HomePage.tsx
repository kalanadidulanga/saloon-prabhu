import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
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

        <div className=" bg-rose-500 min-h-screen"></div>
      </div>
    </>
  );
};

export default HomePage;
