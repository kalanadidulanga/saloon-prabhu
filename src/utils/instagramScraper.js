// src/utils/instagramScraper.js
import Insta from 'scraper-instagram';

const HASHTAG = 'salonprabhu';

export const fetchInstagramPosts = async () => {
  const InstaClient = new Insta();

  try {
    // Fetch posts with the hashtag
    const hashtagData = await InstaClient.getHashtag(HASHTAG);
    return hashtagData.lastPosts || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
};