import { useState, useEffect } from "react";
import axios from "axios";

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  caption?: string;
  permalink: string;
}

const HashtagGallery = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FACEBOOK_ACCESS_TOKEN = "YOUR_LONG_LIVED_ACCESS_TOKEN";
  const INSTAGRAM_ACCOUNT_ID = "YOUR_INSTAGRAM_ACCOUNT_ID";

  const fetchInstagramHashtagMedia = async () => {
    try {
      // Step 1: Search Hashtag
      const hashtagSearchResponse = await axios.get(
        `https://graph.facebook.com/v19.0/ig_hashtag_search?user_id=${INSTAGRAM_ACCOUNT_ID}&q=salonprabhu&access_token=${FACEBOOK_ACCESS_TOKEN}`
      );

      const hashtagId = hashtagSearchResponse.data.data[0]?.id;

      if (!hashtagId) {
        throw new Error("Hashtag not found");
      }

      // Step 2: Fetch Recent Media for Hashtag
      const recentMediaResponse = await axios.get(
        `https://graph.facebook.com/v19.0/${hashtagId}/recent_media?user_id=${INSTAGRAM_ACCOUNT_ID}&fields=id,media_type,media_url,caption,permalink&access_token=${FACEBOOK_ACCESS_TOKEN}`
      );

      setPosts(recentMediaResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Hashtag Fetch Error:", error);
      setError("Failed to fetch Instagram posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramHashtagMedia();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2 className="text-3xl">#salonprabhu Posts</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id}>
            {post.media_type === "IMAGE" && (
              <img
                src={post.media_url}
                alt={post.caption || "Instagram Post"}
                className="w-full h-64 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagGallery;
