import { useState } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface SquareFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  alt?: string;
  size?: number;
  frameColor?: string;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-gray-200", className)} />
);

export function SquareFrame({
  image,
  alt = "Framed image",
  size = 400,
  frameColor = "#8B7355",
  className,
  ...props
}: SquareFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6">
      <div
        className={cn("relative inline-block w-full aspect-square", className)}
        style={{
          maxWidth: Math.min(size, window.innerWidth - 32),
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
          src="/assets/frame2.png" // Make sure to add your square frame image
          alt="Ornate frame"
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
}
