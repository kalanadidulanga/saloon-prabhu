import { OrnateFrame } from "@/components/ornate-frame";
import Title from "@/components/Title";

const OurStorySection = () => {
  return (
    <div className="container flex flex-col lg:flex-row pb-24">
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className=" flex flex-col justify-center w-full">
          <Title title={"ABOUT"} align="left" />
          <h1 className="text-3xl md:text-4xl font-judson my-8">Our Story</h1>
          <p className=" text-text-color">
            Founded with a vision to create a space where beauty and self-care
            go hand-in-hand, Prabhu Salon has become a sanctuary for those
            looking to enhance their natural beauty. We’re committed to
            providing top-notch services in a welcoming, relaxed environment,
            where you can unwind and leave feeling renewed. From stylish
            haircuts to vibrant color transformations, facials, manicures, and
            more – we strive to deliver exceptional results every time. Our team
            of stylists and beauty experts are constantly learning the latest
            trends, ensuring you always get the best in the beauty world.
          </p>
        </div>
        <div className=" w-full relative flex justify-end mb-8 lg:mb-0">
          <OrnateFrame
            image="/assets/salon.jpg"
            alt="Beautiful landscape"
            aspectRatio="portrait"
            // width={600}
            // height={450}
            className=" w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;
