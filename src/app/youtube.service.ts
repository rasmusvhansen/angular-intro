import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { YoutubeResult, Video } from './types';

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=';
const apiKey = '&key=AIzaSyD4YJITOWdfQdFbcxHc6TgeCKmVS9yRuQ8';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private httpClient: HttpClient) {}

  search(query: string): Observable<Array<Video>> {
    const url = baseUrl + query + apiKey;

    // Calls the YouTube API and transforms the result. Note that nothing happens until the Observable is subscribed to
    return this.httpClient.get<YoutubeResult>(url).pipe(
      // Maps the YoutubeResult coming from the YouTube API to an array of Videos
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
