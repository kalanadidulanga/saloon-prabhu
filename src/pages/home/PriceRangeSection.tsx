import PricingTable from "@/components/PricingTable";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const PriceRangeSection = () => {
  const treatments = [
    { name: "Professional Haircuts", price: "LKR 2500" },
    { name: "Professional Haircut Styling", price: "LKR 3500" },
    { name: "Bridal Makeup", price: "LKR 50000" },
    { name: "Event Makeup", price: "LKR 40000" },
    { name: "Hari Treatment", price: "LKR 7500" },
    { name: "Hari Coloring", price: "LKR 3200" },
  ];

  return (
    <>
      <div className="container flex flex-col py-24">
        <div className="w-full flex flex-col lg:flex-row gap-16">
          <div className=" flex flex-col w-full">
            <Title title={"PRICE RANGE"} align="left" />
            <h1 className="text-3xl md:text-4xl font-judson my-8">
              Service fees for your beauty and body care
            </h1>

            <PricingTable treatments={treatments} />
          </div>
          <div className=" w-full relative flex justify-center items-center mb-8 lg:mb-0">
            <img
              src="/assets/home3.png"
              className=" w-full max-w-md object-contain"
            />
          </div>
        </div>
        <Button
          variant={"black"}
          size={"mySize"}
          className="mt-12 mx-auto tracking-wider"
          asChild
        >
          <Link to={"../services"} className=" capitalize font-normal">
            LEARN MORE
          </Link>
        </Button>
      </div>
    </>
  );
};

export default PriceRangeSection;
