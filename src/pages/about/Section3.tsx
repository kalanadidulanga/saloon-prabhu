import { FramedContent } from "@/components/FramedContent";
import { HeartHandshake, PhoneCall, Star } from "lucide-react";

const Section3 = () => {
  const WHY_CHOOSE_US = [
    {
      id: 1,
      image: "/assets/111.png",
      title: "Expert Stylists",
      description:
        "Skilled professionals who specialize in all aspects of beauty.",
    },
    {
      id: 2,
      image: "/assets/222.png",
      title: "Relaxing Atmosphere",
      description: "A peaceful, stylish space where you can unwind.",
    },
    {
      id: 3,
      image: "/assets/333.png",
      title: "Premium Products",
      description:
        "We use only the highest quality products for every service.",
    },
    {
      id: 4,
      image: "/assets/444.png",
      title: "Customer CARE",
      description:
        "Your satisfaction and well-being are at the heart of everything we do.",
    },
  ];

  return (
    <div className=" bg-Color/60">
      <div className="container flex flex-col pt-24 gap-8">
        <h1 className="text-3xl md:text-4xl font-judson my-8 text-center">
          Our Values
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FramedContent
            className="bg-white shadow-lg"
            frameSrc="/assets/frame3.png"
          >
            <div className=" flex flex-col items-center gap-6 px-16 py-12">
              <div className=" flex justify-center items-center w-20 h-20 bg-color-10 rounded-full">
                <Star size={24} className="text-white" />
              </div>
              <h1 className="text-center text-xl font-medium text-color-9">
                EXCELLENCE
              </h1>
              <p className="text-center text-color-9/75">
                We go the extra mile to ensure every client leaves our salon
                with a smile.
              </p>
            </div>
          </FramedContent>

          <FramedContent
            className="bg-white shadow-lg"
            frameSrc="/assets/frame3.png"
          >
            <div className=" flex flex-col items-center gap-6 px-16 py-12">
              <div className=" flex justify-center items-center w-20 h-20 bg-color-10 rounded-full">
                <HeartHandshake size={24} className="text-white" />
              </div>
              <h1 className="text-center text-xl font-medium text-color-9 uppercase">
                Personalized Service
              </h1>
              <p className="text-center text-color-9/75">
                Every client is unique, and we tailor our services to meet your
                individual needs.
              </p>
            </div>
          </FramedContent>

          <FramedContent
            className="bg-white shadow-lg"
            frameSrc="/assets/frame3.png"
          >
            <div className=" flex flex-col items-center gap-6 px-16 py-12">
              <div className=" flex justify-center items-center w-20 h-20 bg-color-10 rounded-full">
                <PhoneCall size={24} className="text-white" />
              </div>
              <h1 className="text-center text-xl font-medium text-color-9">
                Customer Care
              </h1>
              <p className="text-center text-color-9/75">
                Your comfort and satisfaction are our top priority.
              </p>
            </div>
          </FramedContent>
        </div>
      </div>

      <div className="container flex flex-col pb-24 pt-24 gap-8">
        <h1 className="text-3xl md:text-4xl font-judson my-8 text-center">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <FramedContent
              key={item.id}
              className="bg-white shadow-lg"
              frameSrc="/assets/frame4.png"
            >
              <div className=" flex flex-col items-center gap-6 px-16 md:px-8 py-32 md:py-12">
                <div className=" flex justify-center items-center w-24 h-24 rounded-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" object-cover object-center w-full h-full"
                  />
                </div>
                <h1 className="text-center text-lg font-medium text-color-9 uppercase">
                  {item.title}
                </h1>
                <p className="text-center text-color-9/75">
                  {item.description}
                </p>
              </div>
            </FramedContent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
