import Title from "@/components/Title";

const ServicesSection = () => {
  return (
    <div className="container flex flex-col items-center py-24">
      <Title title={"SERVICES"} align={"center"} />
      <div className="text-3xl md:text-4xl font-judson mt-8 mb-12 text-center max-w-lg">
        We’re Committed to Giving You the Best Service
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
    </div>
  );
};

export default ServicesSection;
