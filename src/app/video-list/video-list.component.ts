import { Component, OnDestroy } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Video } from '../types';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnDestroy {
  public videos: Video[];

  constructor(private youtubeService: YoutubeService) {
    this.videos = this.youtubeService.search('not used');
  }

  ngOnDestroy() {}
}
