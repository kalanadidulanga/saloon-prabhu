const LocationSection = () => {
  return (
    <div className=" container py-24">
      <div className=" flex flex-col flex-1">
        <div className=" flex items-center">
          <h1 className="text-3xl md:text-4xl font-judson text-nowrap">
            Location Saloon Prabhu
          </h1>{" "}
          <div className=" border-2 border-primary w-full ml-8"></div>
        </div>
        <p className=" mt-5 text-[#525252] text-sm lg:text-base">
          Want to visit Saloon Prabhu but worried about travel or timing? Don’t
          worry! Reach out to us, and we’ll help you find the best time to visit
          based on your location and schedule. Our team is always ready to
          assist and ensure your grooming experience is as convenient as
          possible.
        </p>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 mt-16 items-center lg:gap-32 justify-center">
        <div className=" w-full">
          <img
            src="/assets/locationpng.png"
            alt=""
            className=" object-cover object-center w-full"
          />
        </div>
        <div className=" w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2023616.6683735466!2d79.38685699961503!3d7.855627729237328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8bc570145eafbc15%3A0x15f655659825b160!2sFuchsius%20(PVT)%20Ltd!5e0!3m2!1sen!2slk!4v1737436010124!5m2!1sen!2slk"
            // width="600"
            // height="450"
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
            className=" w-full h-full aspect-square"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
