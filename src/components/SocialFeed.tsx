import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import Title from "./Title";

interface MediaItem {
  id: string;
  media_url?: string;
  caption?: string;
  username?: string;
  timestamp?: string;
}

interface HashtagSearchResponse {
  id: string;
}

interface MediaResponse {
  data: MediaItem[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
}

const SocialFeed = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHashtagMedia = async () => {
    try {
      const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
      const businessAccountId = import.meta.env.VITE_INSTAGRAM_BUSINESS_ID;

      if (!accessToken || !businessAccountId) {
        throw new Error("Missing Instagram API credentials");
      }

      // Hashtag search
      const hashtagResponse = await fetch(
        `https://graph.facebook.com/v17.0/ig_hashtag_search?user_id=${businessAccountId}&q=simplyTrafalgar&access_token=${accessToken}`
      );
      const hashtagData: HashtagSearchResponse = await hashtagResponse.json();

      // Media fetch
      const mediaResponse = await fetch(
        `https://graph.facebook.com/v17.0/${hashtagData.id}/recent_media?user_id=${businessAccountId}&access_token=${accessToken}`
      );
      const mediaData: MediaResponse = await mediaResponse.json();

      console.log(mediaData);
      //   setMediaItems(mediaData.data);
    } catch (error) {
      console.error("Error fetching hashtag media:", error);
      setMediaItems([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHashtagMedia();
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <div className="text-center mb-8">
        <Title title="Social Feed" align="center" className="mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">#salonprabhu</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={item.media_url || "/api/placeholder/400/400"}
                alt={item.caption || "Travel moment"}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className="text-center mt-8">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          onClick={() => fetchHashtagMedia()}
        >
          Load More
        </button>
      </div> */}
    </div>
  );
};

export default SocialFeed;
