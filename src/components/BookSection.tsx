import Title from "./Title";

const BookSection = () => {
  return (
    <div>
      <div className=" container flex flex-col py-24 items-center">
        <Title title="PRICE RANGE" align="center" />
        <h2 className="text-3xl md:text-4xl font-judson my-8 text-center">
          Service fees for your beauty and body care
        </h2>
        <div
          id="book"
          className="book min-h-96 border-2 border-Color w-full"
        ></div>
      </div>
    </div>
  );
};

export default BookSection;
