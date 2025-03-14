// import useAxios from "@/hooks/useAxios";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const file = "/uploads/1738235206355-8baw5vq74bw.jpg"

const response:any = await fetch(import.meta.env.VITE_BASE_URL + '/api/package2');

console.log(response.data.data);

const pictures = [
"/textures/DSC00680.jpg",
"/textures/DSC00933.jpg",
"/textures/DSC00966.jpg",
"/textures/DSC00983.jpg",
`./src/server${file}`,
"/textures/1.jpg",
"/textures/2.jpg",
"/textures/3.jpg",
];

export const pages = [
  {
    front: "/textures/book-cover3.jpg",
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
  back: "/textures/book-back3.jpg",
});

export const pageAtom = atom(1);

// const file = "/uploads/1738235206355-8baw5vq74bw.jpg";

// // Initialize pictures with default values
// const defaultPictures = [
//   `./src/server${file}`,
//   "/textures/3.jpg",
// ];

// // Fetch images from the API and construct the pages array
// const fetchImagesAndConstructPages = async () => {
//   const { fetch } = useAxios();

//   try {
//     const { data } = await fetch({
//       url: "/api/package2",
//       method: "GET",
//     });

//     const imageArray = data.data.map((item: any) => item.imageUrl);
//     console.log(imageArray);
//     // Combine default pictures with fetched pictures
//     const pictures = [...defaultPictures, ...imageArray];

//     // Construct the pages array
//     const pages = [
//       {
//         front: "/textures/book-cover3.jpg",
//         back: pictures[0],
//       },
//     ];

//     for (let i = 1; i < pictures.length - 1; i += 2) {
//       pages.push({
//         front: pictures[i % pictures.length],
//         back: pictures[(i + 1) % pictures.length],
//       });
//     }

//     pages.push({
//       front: pictures[pictures.length - 1],
//       back: "/textures/book-back3.jpg",
//     });

//     return pages;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Fallback to default pages if fetching fails
//     return [
//       {
//         front: "/textures/book-cover3.jpg",
//         back: defaultPictures[0],
//       },
//       {
//         front: defaultPictures[1],
//         back: "/textures/book-back3.jpg",
//       },
//     ];
//   }
// };

// // Initialize pages as an empty array
// let pages: any = [];

// // Fetch data and populate pages before the module is fully loaded
// fetchImagesAndConstructPages().then((fetchedPages) => {
//   pages = fetchedPages;
// });

// // Export the pages array (it will be populated after the promise resolves)
// export { pages };

// // Export the pageAtom
// export const pageAtom = atom(1);

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
                className={`border-transparent bg-Color hover:border-white transition-all duration-300  px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${index === page
                    ? "bg-Color/90 text-black"
                    : "bg-Color/30 text-black"
                  }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent bg-Color hover:border-white transition-all duration-300  px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${page === pages.length
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
