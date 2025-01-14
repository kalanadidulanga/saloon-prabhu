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
        className={` capitalize text-color-5 text-base tracking-wide ${
          align === "left"
            ? " text-left"
            : align === "right"
            ? "text-right"
            : "text-center"
        }`}
      >
        {title}
      </p>
      <div className={` border-2 border-color-3 w-20 rounded-full`} />
    </div>
  );
};

export default Title;
