import { create } from 'zustand';
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

interface PagesState {
  pages: any[];
  loading: boolean;
  setPages: (pages: any[]) => void;
  setLoading: (loading: boolean) => void;
  fetchImages: () => Promise<void>;
}

export const usePagesStore = create<PagesState>((set) => ({
  pages: [],
  loading: true,
  setPages: (pages) => set({ pages }),
  setLoading: (loading) => set({ loading }),
  fetchImages: async () => {
    set({ loading: true });
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/package2");
      const data = await response.json();
      if (data?.data) {
        const fetchedImages = data.data.map((item: { imageUrl: string }) => `./src/server${item.imageUrl}`);
        const defaultPictures: string[] = [];
        const updatedPictures = [...defaultPictures, ...fetchedImages];
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
        set({ pages: constructPages(updatedPictures) });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    set({ loading: false });
  },
}));

export const pageAtom = atom(1);

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const { pages, loading, fetchImages } = usePagesStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <main className="pointer-events-none select-none z-10 absolute w-full bottom-0 flex flex-col">
      <div className="w-full overflow-auto pointer-events-auto flex justify-center">
        <div className="overflow-auto flex items-center gap-4 max-w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            pages.length > 0 && pages.map((_, index) => (
              <button
                key={index}
                className={`border-transparent bg-Color hover:border-white transition-all duration-300 px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${index === page ? "bg-Color/90 text-black" : "bg-Color/30 text-black"
                  }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))
          )}
          <button
            className={`border-transparent bg-Color hover:border-white transition-all duration-300 px-4 py-3 rounded-full uppercase shrink-0 border text-sm ${page === pages.length ? "bg-Color/90 text-black" : "bg-Color/30 text-black"
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
