import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=';
const apiKey = '&key=AIzaSyD4YJITOWdfQdFbcxHc6TgeCKmVS9yRuQ8';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private httpClient: HttpClient) {}

  search(query: string): Observable<Array<Video>> {
    return this.httpClient.get<YoutubeResult>(baseUrl + query + apiKey).pipe(
      map(res => {
        return res.items.map(v => {
          const snip = v.snippet;
          return {
            title: snip.title,
            description: snip.description,
            thumb: snip.thumbnails.medium.url,
            link: 'https://www.youtube.com/watch?v=' + v.id.videoId
          };
        });
      })
    );
  }
}

interface YoutubeResult {
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
