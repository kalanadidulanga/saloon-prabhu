import { useState, useEffect } from "react";
// import { Instagram } from "lucide-react";
import Title from "./Title";
// @ts-ignore
import { fetchInstagramPosts } from '../utils/instagramScraper';


// interface MediaItem {
//   id: string;
//   media_url?: string;
//   caption?: string;
//   username?: string;
//   timestamp?: string;
// }

interface InstagramPost {
  shortcode: string;
  caption: string;
  thumbnail: string;
  likes: number;
  comments: number;
}

// interface HashtagSearchResponse {
//   id: string;
// }

// interface MediaResponse {
//   data: MediaItem[];
//   paging?: {
//     cursors: {
//       before: string;
//       after: string;
//     };
//     next: string;
//   };
// }

const SocialFeed = () => {
  // const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const data:any = await fetchInstagramPosts();
      setPosts(data);
      setLoading(false)
    };
    getPosts();
  }, []);

  // const fetchHashtagMedia = async () => {
  //   try {
  //     const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
  //     const businessAccountId = import.meta.env.VITE_INSTAGRAM_BUSINESS_ID;

  //     if (!accessToken || !businessAccountId) {
  //       throw new Error("Missing Instagram API credentials");
  //     }

  //     // Hashtag search
  //     const hashtagResponse = await fetch(
  //       `https://graph.facebook.com/v17.0/ig_hashtag_search?user_id=${businessAccountId}&q=simplyTrafalgar&access_token=${accessToken}`
  //     );
  //     const hashtagData: HashtagSearchResponse = await hashtagResponse.json();

  //     // Media fetch
  //     const mediaResponse = await fetch(
  //       `https://graph.facebook.com/v17.0/${hashtagData.id}/recent_media?user_id=${businessAccountId}&access_token=${accessToken}`
  //     );
  //     const mediaData: MediaResponse = await mediaResponse.json();

  //     console.log(mediaData);
  //     //   setMediaItems(mediaData.data);
  //   } catch (error) {
  //     console.error("Error fetching hashtag media:", error);
  //     setMediaItems([]); // Ensure empty array on error
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // async function fetchInstagramMedia() {
  //   setMediaItems([]);
  //   setLoading(true);
  //   const accessToken =
  //     "IGAAzQ9AjY4HlBZAE1HLU9tSkhtUVZAkb0lHQkJfTHRwZA2NVQ01menVlUjlLeTk1N3VOQlZAxR3ZAyMGROZAzdIYjZAjRDBsbEFJTzU4R2FwNlFvU0hhM0RoUi1TRV9uY3JtdHlFcW95aEdxOHVodjNqUm9zWm1uU2Qtdnk1c0NzeG1GZAwZDZD";
  //   const userId = "kalanakoralegedara"; // Replace with your Instagram User ID

  //   const graphApiUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`;
  //   // const basicDisplayApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`;

  //   try {
  //     const responseGraph = await fetch(graphApiUrl);
  //     // const responseBasic = await fetch(basicDisplayApiUrl);

  //     console.log(responseGraph);
  //     // const dataGraph = await responseGraph.json();
  //     // const dataBasic = await responseBasic.json();

  //     // return [...dataGraph.data, ...dataBasic.data];
  //   } catch (error) {
  //     console.error("Error fetching media:", error);
  //     return [];
  //   }
  // }

  // useEffect(() => {
  //   // fetchHashtagMedia();
  //   fetchInstagramMedia();
  // }, []);

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
          {posts.map((post, index) => (
            <a
              key={index}
              href={`https://www.instagram.com/p/${post.shortcode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={post.thumbnail}
                alt={post.caption || 'Instagram Post'}
                className="w-full h-64 object-cover"
              />
              {post.caption && (
                <p className="p-4 text-sm text-gray-700">{post.caption}</p>
              )}
              <div className="p-4 text-sm text-gray-600">
                <span>❤️ {post.likes}</span>
                <span className="ml-4">💬 {post.comments}</span>
              </div>
            </a>
          ))}
        </div>
      )}

    </div>
  );
};

export default SocialFeed;
