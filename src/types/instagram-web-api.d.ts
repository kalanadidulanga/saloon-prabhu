// src/types/instagram-web-api.d.ts

declare module 'instagram-web-api' {
    interface InstagramCredentials {
      username: string;
      password: string;
      cookieStore?: any;
    }
  
    interface InstagramOptions {
      language?: string;
      proxy?: string;
      requestOptions?: any;
    }
  
    interface MediaResponse {
      edge_hashtag_to_media: {
        edges: Array<{
          node: {
            shortcode: string;
            thumbnail_src: string;
            edge_media_to_caption: {
              edges: Array<{
                node: {
                  text: string;
                };
              }>;
            };
            edge_liked_by: {
              count: number;
            };
            edge_media_to_comment: {
              count: number;
            };
          };
        }>;
      };
    }
  
    class Instagram {
      constructor(credentials: InstagramCredentials, options?: InstagramOptions);
      login(): Promise<{ authenticated: boolean; user: boolean }>;
      getMediaFeedByHashtag({ hashtag }: { hashtag: string }): Promise<MediaResponse>;
      // Add other methods as needed
    }
  
    export default Instagram;
  }
  
  // Also declare the cookie store module
  declare module 'tough-cookie-filestore2' {
    class FileCookieStore {
      constructor(path: string);
    }
    export = FileCookieStore;
  }