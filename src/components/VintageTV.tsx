import { useState } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface VintageTVProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string;
  width?: number;
  height?: number;
}

export function VintageTV({
  videoSrc,
  width = 600,
  height = 450,
  className,
  ...props
}: VintageTVProps) {
  const [error, setError] = useState(false);

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6">
      <div
        className={cn("relative inline-block w-full", className)}
        style={{
          maxWidth: Math.min(width, window.innerWidth - 32),
        }}
        {...props}
      >
        <div className="relative" style={{ paddingTop: "75%" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Video Background */}
            {!error ? (
              <video
                className="w-[84%] h-[84%] absolute left-[8%] top-[8%] object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                onError={() => setError(true)}
              />
            ) : (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black flex items-center justify-center">
                <p className="text-red-500 text-sm">Failed to load video</p>
              </div>
            )}

            {/* TV Frame Image Overlay */}
            <img
              src="/assets/tv.png"
              alt="Vintage TV frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
