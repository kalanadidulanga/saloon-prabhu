// src/utils/instagramScraper.ts
import Instagram from 'instagram-web-api'
import FileCookieStore from 'tough-cookie-filestore2'

const cookieStore = new FileCookieStore('./cookies.json')

const client = new Instagram({
  username: import.meta.env.VITE_INSTAGRAM_USERNAME,
  password: import.meta.env.VITE_INSTAGRAM_PASSWORD,
  cookieStore
})

export interface InstagramPost {
  shortcode: string;
  caption: string;
  thumbnail: string;
  likes: number;
  comments: number;
}

export async function fetchInstagramPosts(hashtag: string = 'salonprabhu'): Promise<InstagramPost[]> {
  try {
    await client.login()
    const data = await client.getMediaFeedByHashtag({ hashtag })
    
    if (!data || !data.edge_hashtag_to_media?.edges) {
      return []
    }

    return data.edge_hashtag_to_media.edges.map(edge => ({
      shortcode: edge.node.shortcode,
      caption: edge.node.edge_media_to_caption?.edges[0]?.node?.text || '',
      thumbnail: edge.node.thumbnail_src,
      likes: edge.node.edge_liked_by?.count || 0,
      comments: edge.node.edge_media_to_comment?.count || 0
    }))
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return []
  }
}