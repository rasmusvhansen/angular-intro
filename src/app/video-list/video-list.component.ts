import { Component, OnInit, OnDestroy } from '@angular/core';
import { YoutubeService, Video } from '../youtube.service';
import { Observable, merge, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, debounceTime, filter, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {
  private userSearchSubscription: Subscription;
  public videos$: Observable<Video[]>;
  public query = new FormControl('');

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute, private router: Router) {
    this.userSearchSubscription = this.query.valueChanges
      .pipe(
        debounceTime(500),
        filter(q => q.length > 1)
      )
      .subscribe(q => this.router.navigate(['videos', q]));
    const routeSearch$ = this.route.paramMap.pipe(map(param => param.get('query')));
    this.videos$ = routeSearch$.pipe(switchMap(q => this.youtubeService.search(q)));
  }

  ngOnDestroy() {
    this.userSearchSubscription.unsubscribe();
  }

  ngOnInit() {}
}
