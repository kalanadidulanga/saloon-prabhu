import { SquareFrame } from "@/components/SquareFrame";
import Title from "@/components/Title";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomersSection = ({
  customers,
  isLoading,
}: {
  customers: any[];
  isLoading?: boolean;
}) => {
  const settings = {
    dots: true, // Enable dots for navigation
        infinite: true, // Enable infinite looping
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 4, // Default number of slides to show on large screens
        slidesToScroll: 1,
        autoplay: true, // Enable auto-play
        autoplaySpeed: 5000, // Auto-play speed in milliseconds
        arrows: false, // Hide the next/previous arrows
        pauseOnHover: true, // Pause auto-play when hovering
        swipe: true, // Enable swipe on mobile
        draggable: true, // Allow dragging to slide
        responsive: [
            {
                breakpoint: 2000, // Screen width 600px and below
                settings: {
                    slidesToShow: 4, // Show 1 slide on small devices
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1400, // Screen width 600px and below
                settings: {
                    slidesToShow: 3, // Show 1 slide on small devices
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992, // Screen width 1024px and below
                settings: {
                    slidesToShow: 2, // Show 2 slides on tablets
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Screen width 600px and below
                settings: {
                    slidesToShow: 1, // Show 1 slide on small devices
                    slidesToScroll: 1,
                },
            }
        ],
  };

  return (
    <div className="bg-customerbg bg-cover bg-center ">
      <div className="backdrop-blur-sm">
        <div className="container py-24 flex flex-col items-center ">
          <Title title={"CUSTOMERS"} align={"center"} textColor="text-white" />
          <div className="text-3xl md:text-4xl font-judson mt-8 mb-12 text-center max-w-lg text-white">
            Meet Our Happy Customers
          </div>
          {isLoading && (
            <p className="text-center text-white w-full text-xl">Loading...</p>
          )}
          {/* <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mt-8 gap-y-8"> */}
          <div className=" w-full mt-8">
            <Slider {...settings}>
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
            </Slider>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomersSection;
