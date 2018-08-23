export interface YoutubeResult {
  items: {
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
    id: {
      videoId: string;
    };
  }[];
}

export interface Video {
  title: string;
  description: string;
  thumb: string;
  link: string;
}
