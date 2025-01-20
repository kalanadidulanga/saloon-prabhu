import { SquareFrame } from "@/components/SquareFrame";
import Title from "@/components/Title";

const CustomersSection = ({ customers }: { customers: any[] }) => {
  return (
    <div className="bg-customerbg">
      <div className="container py-24 flex flex-col items-center">
        <Title title={"CUSTOMERS"} align={"center"} textColor="text-white" />
        <div className="text-3xl md:text-4xl font-judson mt-8 mb-12 text-center max-w-lg text-white">
          Meet Our Happy Customers
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-8">
          {customers.length > 0 &&
            customers.map((customer: any) => (
              <div
                key={customer.id}
                className="flex flex-col text-white items-center"
              >
                <SquareFrame
                  image={customer.imageUrl}
                  alt={customer.name}
                  size={800}
                  className=" w-full"
                />
                <h5 className="text-lg mt-4 text-center">{customer.name}</h5>
                <p className=" text-xs md:text-sm text-center mt-3 font-light">
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
