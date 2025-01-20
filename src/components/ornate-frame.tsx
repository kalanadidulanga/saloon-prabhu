import { useState } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface OrnateFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  alt?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  width?: number;
  height?: number;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200", className)} />
);

export function OrnateFrame({
  image,
  alt = "Framed image",
  aspectRatio = "portrait",
  width = 500,
  height = 600,
  className,
  ...props
}: OrnateFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={cn(
          "relative inline-block w-full",
          aspectRatioClasses[aspectRatio],
          className
        )}
        style={{
          maxWidth: Math.min(width, window.innerWidth - 32),
          maxHeight: height,
        }}
        {...props}
      >
        {/* Content Area */}
        <div className="absolute inset-[15%] z-0">
          {image ? (
            <>
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover object-center rounded-sm"
                onLoad={() => setIsLoading(false)}
                onError={() => setError(true)}
              />
              {isLoading && <Skeleton className="w-full h-full rounded-sm" />}
              {error && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm">
                  <p className="text-sm text-gray-500">Failed to load image</p>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm">
              <p className="text-sm text-gray-500">No image provided</p>
            </div>
          )}
        </div>

        {/* Ornate Frame */}
        <img
          src="/assets/frame.png"
          alt="Ornate frame"
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
}
