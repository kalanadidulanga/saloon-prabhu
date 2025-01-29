import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "qqqqq",
  // "DSC01040",
  // "DSC01064",
  // "DSC01071",
  // "DSC01103",
  // "DSC01145",
  // "DSC01420",
  // "DSC01461",
  // "DSC01489",
  // "DSC02031",
  // "DSC02064",
  // "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover3",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back3",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 absolute w-full bottom-0 flex justify-between flex-col">
        {/* <a className="pointer-events-auto mt-10 ml-10" href="#">
          <img className="w-20" src="/images/wawasensei-white.png" />
        </a> */}
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent bg-Color hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border text-sm ${
                  index === page
                    ? "bg-Color/90 text-black"
                    : "bg-Color/30 text-black"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent bg-Color hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border text-sm ${
                page === pages.length
                  ? "bg-Color/90 text-black"
                  : "bg-Color/30 text-black"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">KayD</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">KayD</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">KayD</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">KayD</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              KayD
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">KayD</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">KayD</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">KayD</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              KayD
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">KayD</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              KayD
            </h2>
          </div>
        </div>
      </div> */}
    </>
  );
};
