import { useState, useEffect } from "react";
import axios from "axios";
import Title from "./Title";

const HashtagGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchInstagramData = async () => {
    try {
      const accessToken = "YOUR_LONG_LIVED_ACCESS_TOKEN";
      const hashtagName = "salonprabhu";

      // Note: This is a simplified example
      const response = await axios.get(
        `https://graph.facebook.com/v17.0/ig_hashtag_search?user_id=YOUR_USER_ID&q=${hashtagName}&access_token=${accessToken}`
      );

      console.log(response.data);

      // Additional API calls needed to get actual media
    } catch (error) {
      console.error("Failed to fetch hashtag data");
    }
  };

  useEffect(() => {
    fetchInstagramData();
  }, []);

  return (
    <div className="container py-24">
      <div className=" flex flex-col items-center gap-5">
        <Title title={"PROJECTS"} align={"center"} textColor="text-primary" />
        <h2 className="text-4xl text-[#28262C] font-judson font-bold text-center mb-4">
          #salonprabhu
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
    </div>
  );
};

export default HashtagGallery;
