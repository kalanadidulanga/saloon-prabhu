// src/components/SocialFeed.tsx
import { useState, useEffect } from "react";
import Title from "./Title";
import { fetchInstagramPosts, InstagramPost } from '../utils/instagramScraper3';

const SocialFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInstagramPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch Instagram posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <div className="text-center mb-8">
        <Title title="Social Feed" align="center" className="mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">#salonprabhu</h2>
      </div>

      {error && (
        <div className="text-center text-red-600 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <a
              key={post.shortcode}
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
                <p className="p-4 text-sm text-gray-700 line-clamp-2">
                  {post.caption}
                </p>
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