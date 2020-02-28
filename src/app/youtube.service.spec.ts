import { YoutubeService } from './youtube.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { YoutubeResult } from './types';

const youtubeResult: YoutubeResult = {
  items: [
    {
      id: { videoId: 'videoId1' },
      snippet: {
        description: 'description1',
        title: 'title1',
        thumbnails: {
          medium: {
            url: 'thumb1.jpg'
          }
        }
      }
    }
  ]
};

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('httpClient', ['get']);
    service = new YoutubeService(httpClient);
  });

  it('should return empty list on no results', () => {
    const youtubeResult: YoutubeResult = {
      items: []
    };

    httpClient.get.and.returnValue(of(youtubeResult));

    service.search({ query: 'grus', age: 0 }).subscribe(res => {
      expect(res.length).toBe(0);
    });
  });

  it('should call youtube endpoint with query and age', () => {
    const youtubeResult: YoutubeResult = {
      items: []
    };

    httpClient.get.and.returnValue(of(youtubeResult));

    service.search({ query: 'grus', age: 42 }).subscribe(() => {
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const url = httpClient.get.calls.mostRecent().args[0];
      expect(url).toContain('grus');
      expect(url).toContain('publishedAfter');
    });
  });

  it('should map youtube result to list of videos', () => {
    httpClient.get.and.returnValue(of(youtubeResult));

    service.search({ query: 'rick', age: 0 }).subscribe(videos => {
      expect(videos.length).toBe(1);
      const video = videos[0];
      expect(video).toEqual(jasmine.objectContaining({ title: 'title1', description: 'description1', thumb: 'thumb1.jpg' }));
      expect(video.link).toBe('https://www.youtube.com/watch?v=videoId1');
    });
  });
});
