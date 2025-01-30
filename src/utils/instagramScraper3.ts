// src/utils/instagramScraper.ts
import axios from 'axios';

const ACCESS_TOKEN = 'IGAAH6cgeYdiNBZAE1uWjZAsMThqdGlaU25SWUcxaTIyb0lOZAUFuS1NRWXR5RFJuNy13dUFkSDlBeV9zRXAyXzNBa2M0NHFBQVBZAT2hzbUhqQVBiWWo1dmJpdmsyVHZADa3FxTTdMLTl1aUlSOVVYbDNQcTZA3X2dNUjJPajlKVWRVRQZDZD'; // Replace with your access token
const USER_ID = '17841454096356187'; // Replace with your Instagram Business or Creator Account ID

export interface InstagramPost {
  id: string;
  shortcode: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
}

export const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  try {
    // Step 1: Get Hashtag ID for #salonprabhu
    const hashtagResponse = await axios.get(`https://graph.facebook.com/v15.0/ig_hashtag_search`, {
      params: {
        user_id: USER_ID,
        q: 'salonprabhu', // Hashtag without the #
        access_token: ACCESS_TOKEN,
      },
    });

    if (!hashtagResponse.data.data || hashtagResponse.data.data.length === 0) {
      throw new Error('Hashtag not found or no data returned');
    }

    const hashtagId = hashtagResponse.data.data[0].id;

    // Step 2: Get Recent Media for the Hashtag
    const mediaResponse = await axios.get(`https://graph.facebook.com/v15.0/${hashtagId}/recent_media`, {
      params: {
        user_id: USER_ID,
        access_token: ACCESS_TOKEN,
        fields: 'id,media_type,media_url,permalink,caption,like_count,comments_count',
      },
    });

    // Step 3: Transform the data into a usable format
    const posts: InstagramPost[] = mediaResponse.data.data
      .filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') // Filter for images
      .map((post: any) => ({
        id: post.id,
        shortcode: post.permalink.split('/p/')[1].replace('/', ''),
        thumbnail: post.media_url,
        caption: post.caption || '',
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
      }));

    return posts;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw error;
  }
};