import { Component, OnDestroy } from '@angular/core';
import { Video } from '../types';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnDestroy {
  public videos: Video[];

  constructor() {
    this.videos = [
      {
        title: 'Angular in 60 Minutes',
        description: 'Learn angular in 60 minutes',
        thumb: 'https://i.ytimg.com/vi/KhzGSHNhnbI/mqdefault.jpg',
        link: 'https://www.youtube.com/watch?v=KhzGSHNhnbI'
      },
      {
        title: 'Angular vs React.js vs Vue.js - My Thoughts!',
        description:
          'Angular, React.js or Vue.js? I get this question a lot! Let me share some thoughts on it with you! ' +
          'Early bird offer - Join my course on this topic for only $10: ',
        thumb: 'https://i.ytimg.com/vi/KMX1mFEmM3E/mqdefault.jpg',
        link: 'https://www.youtube.com/watch?v=KMX1mFEmM3E'
      }
    ];
  }

  ngOnDestroy() {}
}
