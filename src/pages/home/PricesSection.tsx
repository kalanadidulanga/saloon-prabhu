import Title from "@/components/Title";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface ServiceItem {
  name: string;
  price: number;
}

interface Package {
  name: string;
  serviceItems: ServiceItem[];
}

interface Category {
  name: string;
  packages: Package[];
}

const PricesSection = () => {
  const { fetch, loading } = useAxios();
  const [priceList, setPriceList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const loadPriceList = async () => {
    try {
      const { data } = await fetch({
        url: "/api/categories",
        method: "GET",
      });
      if (data.success && data.data.length > 0) {
        setPriceList(data.data);
        setSelectedCategory(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      toast.error("Failed to fetch prices. Please try again.");
    }
  };

  useEffect(() => {
    loadPriceList();
  }, []);

  return (
    <div className="bg-[#FAF4E7] flex flex-col flex-1 w-full relative">
      <img
        src="/assets/pricerangebg.png"
        alt="bg"
        className="w-full absolute h-full z-0"
      />
      <div className="container pt-24 pb-24 flex flex-col items-center z-10">
        <Title title="Price Range" align="center" textColor="text-black" />
        <div className="text-3xl md:text-4xl font-judson my-8 text-center max-w-lg text-[#28262C]">
          Service fees for your beauty and body care
        </div>

        {loading && (
          <div className=" flex items-center justify-center mx-auto my-8 py-3 gap-3">
            <Loader className="animate-spin" /> Loading...
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-5">
          {priceList?.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory?.name === category.name
                  ? "bg-[#2F201A] text-white"
                  : "bg-transparent text-[#2F201A]"
              } px-5 py-2 border-2 border-[#2F201A] font-semibold font-judson lg:text-lg`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-h-screen overflow-y-auto">
          {selectedCategory?.packages.map((pkg, index) => (
            <div
              key={index}
              className="flex flex-col flex-1 w-full max-w-xl mx-auto"
            >
              <h4 className="text-xl md:text-2xl font-judson mb-5 max-w-lg text-[#28262C]">
                {pkg.name}
              </h4>
              <table className="border-collapse font-judson border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-300 text-lg text-start py-2 px-5">
                      Name
                    </th>
                    <th className="border border-gray-300 text-lg text-end py-2 px-5">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.serviceItems?.map((serviceItem, serviceIndex) => (
                    <tr key={serviceIndex}>
                      <td className="border border-gray-300 text-start py-2 px-5">
                        {serviceItem.name}
                      </td>
                      <td className="border border-gray-300 text-end py-2 px-5">
                        LKR {serviceItem.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricesSection;
