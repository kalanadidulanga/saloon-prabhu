import { create } from 'zustand';

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
