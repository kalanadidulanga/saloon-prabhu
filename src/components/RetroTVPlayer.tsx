import { useState, useRef } from "react";

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface VintageTVPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  videoUrl?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
}

export function VintageTVPlayer({
  videoUrl,
  autoPlay = true,
  muted = true,
  loop = true,
  width = 600,
  height = 450,
  className,
  ...props
}: VintageTVPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-6">
      <div
        className={cn("relative inline-block w-full", className)}
        style={{
          maxWidth: Math.min(width, window.innerWidth - 32),
        }}
        {...props}
      >
        {/* Video Content Area - Positioned to fit inside the TV screen */}
        <div className="relative" style={{ paddingTop: "75%" }}>
          {" "}
          {/* 4:3 aspect ratio */}
          <div className="absolute inset-0 flex items-center justify-center">
            {videoUrl ? (
              <video
                ref={videoRef}
                className="w-[84%] h-[84%] object-cover absolute left-[8%] top-[8%]"
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline
                onLoadedData={() => setIsLoading(false)}
                onError={() => setError(true)}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black flex items-center justify-center">
                <p className="text-gray-500 text-sm">No signal</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && videoUrl && (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="w-[84%] h-[84%] absolute left-[8%] top-[8%] bg-black flex items-center justify-center">
                <p className="text-red-500 text-sm">Video failed to load</p>
              </div>
            )}

            {/* TV Frame Image Overlay */}
            <img
              src="/assets/tv.png" // Make sure to add the TV frame image to your assets
              alt="Vintage TV frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
