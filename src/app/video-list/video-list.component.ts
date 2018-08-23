import { Component, OnDestroy } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map, debounceTime, filter, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Video } from '../types';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnDestroy {
  private subscriptions = new Subscription();
  public videos$: Observable<Video[]>;

  // Represents the search field in the html
  public query = new FormControl('');

  constructor(private youtubeService: YoutubeService) {
    // Filters the stream of user input so it emits a value every 500ms max, and no values shorter than 2 chars
    const filteredUserSearch$ = this.query.valueChanges.pipe(
      debounceTime(500),
      filter(q => q.length > 1)
    );

    // Maps the stream of queries to a stream of result from the YoutubeService and exposes it to the view
    // The async pipe in the view will take care of subscribe/unsubscribe
    this.videos$ = filteredUserSearch$.pipe(switchMap(q => this.youtubeService.search(q)));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
