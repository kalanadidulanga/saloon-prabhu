const Title = ({
  title,
  className,
  align = "left",
}: {
  title: string;
  className?: string;
  align?: "left" | "right" | "center";
}) => {
  return (
    <div
      className={`flex flex-col gap-1 ${className} ${
        align === "center"
          ? "mx-auto"
          : align === "left"
          ? "mr-auto"
          : "ml-auto"
      }`}
    >
      <p
        className={` capitalize text-color-5 text-lg tracking-wider ${
          align === "left"
            ? "pl-1 pr-5 text-left"
            : align === "right"
            ? "pl-5 pr-1 text-right"
            : "px-1 text-center"
        }`}
      >
        {title}
      </p>
      <div className=" border-2 border-color-3" />
    </div>
  );
};

export default Title;
