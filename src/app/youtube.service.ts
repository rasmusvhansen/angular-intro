import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { YoutubeResult, Video } from './types';
import { SearchParams } from './video-list/video-list.component';

const API_KEY = 'paste your api key here, get a key at https://console.developers.google.com/apis/api/youtube.googleapis.com';
const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}&q=`;

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private httpClient: HttpClient) {}

  search(params: SearchParams): Observable<Array<Video>> {
    const url = baseUrl + params.query + `&publishedAfter=${new Date(Date.now() - params.age * 24 * 60 * 60 * 1000).toISOString()}`;
    console.log(`Searching for ${params.query} with age: ${params.age}`);

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
