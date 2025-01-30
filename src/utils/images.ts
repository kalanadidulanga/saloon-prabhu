export const fetchImages = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/package2");
      const data = await response.json();
  
      if (data?.data) {
        return data.data.map((item: { imageUrl: string }) => `./src/server${item.imageUrl}`);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    return [];
  };