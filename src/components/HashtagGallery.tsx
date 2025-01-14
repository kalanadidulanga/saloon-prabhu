import { useState, useEffect } from "react";
import axios from "axios";

const HashtagGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchInstagramData = async () => {
    try {
      setLoading(true);

      const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your access token
      const hashtagId = "YOUR_HASHTAG_ID"; // Replace with your hashtag ID

      // Fetch hashtag media
      const response = await axios.get(
        `https://graph.facebook.com/v17.0/${hashtagId}/recent_media?user_id=YOUR_USER_ID&access_token=${accessToken}`
      );

      const mediaData = response.data.data;
      setImages(mediaData);
    } catch (err) {
      setError("Failed to fetch Instagram data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramData();
  }, []);

  return (
    <div className="container py-24">
      <h2 className="text-2xl font-judson font-bold text-center mb-4">
        #SallonPrabhu Gallery
      </h2>
      {loading && <p className=" text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.media_url}
              alt={image.caption}
              className="rounded-lg w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold">
              {image.caption || "Instagram Post"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagGallery;
