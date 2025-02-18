import Title from "@/components/Title";

const VisionMissionSection = () => {
  return (
    <div className=" bg-primary-bg">
      <div className="container flex flex-col lg:flex-row pt-24">
        <div className="w-full flex flex-col lg:flex-row gap-16">
          <div className=" flex flex-col justify-center w-full">
            <Title title={"ABOUT VISION"} align="left" />
            <h1 className="text-3xl md:text-4xl font-judson my-8">Vision</h1>
            <p className=" text-text-color">
              At Salon Prabhu, our vision is to be the leading beauty and
              wellness destination, recognized for our innovative approach to
              hairstyling, skincare, and spa treatments. We aspire to empower
              individuals by enhancing their natural beauty and boosting their
              confidence, all while providing a relaxing and rejuvenating
              experience in a welcoming environment.
            </p>
          </div>
          <div className=" w-full relative flex justify-end mb-8 lg:mb-0">
            <img
              src="/assets/vision.png"
              className=" w-full max-w-md object-cover object-center mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row pb-24 pt-24">
        <div className="w-full flex flex-col lg:flex-row gap-16">
          <div className=" w-full relative flex justify-end mb-8 lg:mb-0">
            <img
              src="/assets/mission.png"
              className=" w-full max-w-md object-cover object-center mx-auto"
            />
          </div>
          <div className=" flex flex-col justify-center w-full">
            <Title title={"ABOUT MISSION"} align="left" />
            <h1 className="text-3xl md:text-4xl font-judson my-8">Mission</h1>
            <p className=" text-text-color">
              Our mission is to deliver personalized, high-quality beauty
              services that make every client feel unique and valued. We are
              committed to offering expert hair care, skin treatments, and spa
              therapies using premium products, the latest techniques, and
              eco-friendly practices. Our goal is to create a place where
              clients can unwind, rejuvenate, and express themselves, all while
              receiving exceptional care from a dedicated team of professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
