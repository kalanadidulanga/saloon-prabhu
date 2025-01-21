import { cn } from "@/lib/utils";

interface FramedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  frameSrc?: string; // Path to the frame image
  alt?: string; // Alt text for the frame image
  topImg?: string; // Path to the top image
}

export function FramedContent({
  children,
  frameSrc = "/frame3.png", // Default to the uploaded frame
  alt = "Decorative frame",
  className,
  topImg,
  ...props
}: FramedContentProps) {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {/* Content Area */}
      <div className="relative z-0 p-4">
        {" "}
        {/* Padding can be adjusted */}
        {children}
      </div>

      {/* Frame */}
      {topImg && (
        <div className=" flex justify-center items-center w-32 h-32 rounded-full absolute left-0 right-0 -top-16 m-auto z-20">
          <img
            src={topImg}
            alt={"Top image"}
            className=" object-cover object-center w-full h-full"
          />
        </div>
      )}

      {/* Frame */}
      <img
        src={frameSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        loading="eager"
      />
    </div>
  );
}
