import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const file = "/uploads/1738235206355-8baw5vq74bw.jpg";

// Atom to track the current page
export const pageAtom = atom(1);

// Default static images
const defaultPictures = [
  `./src/server${file}`,
  "/textures/1.jpg",
  "/textures/2.jpg",
  "/textures/3.jpg",
];

const fetchImages = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/package2");
    const data = await response.json();
    console.log(data);
    if (data?.data) {
      return data.data.map((item: { imageUrl: string }) => `./src/server${item.imageUrl}`);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
  return [];
};

const constructPages = (pictures: string[]) => {
  const pages = [
    { front: "/textures/book-cover3.jpg", back: pictures[0] },
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

  return pages;
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [pages, setPages] = useState(() => constructPages(defaultPictures));

  useEffect(() => {
    const loadImages = async () => {
      const apiImages = await fetchImages();
      const updatedPictures = [...defaultPictures, ...apiImages];
      setPages(constructPages(updatedPictures));
    };

    loadImages();
  }, []);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <main className="pointer-events-none select-none z-10 absolute w-full bottom-0 flex flex-col">
      <div className="w-full overflow-auto pointer-events-auto flex justify-center">
        <div className="overflow-auto flex items-center gap-4 max-w-full">
          {pages.map((_, index) => (
            <button
              key={index}
              className={`border-transparent bg-Color hover:border-white transition-all duration-300 px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${
                index === page ? "bg-Color/90 text-black" : "bg-Color/30 text-black"
              }`}
              onClick={() => setPage(index)}
            >
              {index === 0 ? "Cover" : `Page ${index}`}
            </button>
          ))}
          <button
            className={`border-transparent bg-Color hover:border-white transition-all duration-300 px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${
              page === pages.length ? "bg-Color/90 text-black" : "bg-Color/30 text-black"
            }`}
            onClick={() => setPage(pages.length)}
          >
            Back Cover
          </button>
        </div>
      </div>
    </main>
  );
};
