import { Component, OnInit } from '@angular/core';
import { YoutubeService, Video } from '../youtube.service';
import { Observable, merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, debounceTime, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  public videos$: Observable<Video[]>;
  public query = new FormControl('');

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute) {
    const userSearch$ = this.query.valueChanges;
    const routeSearch$ = this.route.paramMap.pipe(map(param => param.get('query')));
    this.videos$ = merge(routeSearch$, userSearch$).pipe(
      filter(q => q.length > 1),
      debounceTime(500),
      switchMap(q => this.youtubeService.search(q))
    );
  }

  ngOnInit() {}
}
