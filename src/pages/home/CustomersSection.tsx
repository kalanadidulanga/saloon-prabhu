import { SquareFrame } from "@/components/SquareFrame";
import Title from "@/components/Title";

const CustomersSection = ({
  customers,
  isLoading,
}: {
  customers: any[];
  isLoading?: boolean;
}) => {
  return (
    <div className="bg-customerbg bg-cover bg-center">
      <div className="container py-24 flex flex-col items-center">
        <Title title={"CUSTOMERS"} align={"center"} textColor="text-white" />
        <div className="text-3xl md:text-4xl font-judson mt-8 mb-12 text-center max-w-lg text-white">
          Meet Our Happy Customers
        </div>
        {isLoading && (
          <p className="text-center text-white w-full text-xl">Loading...</p>
        )}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mt-8 gap-y-8">
          {customers.length > 0 &&
            customers.map((customer: any) => (
              <div
                key={customer.id}
                className="flex flex-col text-white items-center"
              >
                <SquareFrame
                  image={customer.imgUrl}
                  alt={customer.name}
                  size={800}
                  className=" w-full"
                />
                <h5 className="text-lg mt-4 text-center px-3">
                  {customer.name}
                </h5>
                <p className=" text-xs md:text-sm text-center mt-3 font-light px-3">
                  {customer.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomersSection;
