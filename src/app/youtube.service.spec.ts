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

  it('should return empty list on no results', () => {});

  it('should call youtube endpoint with query and age', () => {
    // use calls.mostRecent.args[0] on the httpClient.get spy to retrieve the arguments
  });

  it('should map youtube result to list of videos', () => {});
});
