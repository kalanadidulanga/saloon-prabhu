const Title = ({
  title,
  className,
  align = "left",
  textColor,
}: {
  title: string;
  className?: string;
  align?: "left" | "right" | "center";
  textColor?: string;
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
        className={` capitalize ${
          textColor ? textColor : "text-color-5"
        }  text-base tracking-wide ${
          align === "left"
            ? " text-left"
            : align === "right"
            ? "text-right"
            : "text-center"
        }`}
      >
        {title}
      </p>
      <div
        className={` border-2 border-primary w-20 rounded-full ${
          align === "center"
            ? "mx-auto"
            : align === "left"
            ? "mr-auto"
            : "ml-auto"
        }`}
      />
    </div>
  );
};

export default Title;
