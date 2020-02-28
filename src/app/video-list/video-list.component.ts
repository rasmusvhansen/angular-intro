import { Component, OnInit, OnDestroy } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Observable, merge, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, debounceTime, filter, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Video } from '../types';
import { trigger, state, transition, style, animate, query, stagger } from '@angular/animations';

export interface SearchParams {
  query: string;
  age: number; // days back in time
}

function rickLidator(control: AbstractControl) {
  return (control.value as string).match(/(rick)|(morty)|(astley)/) ? { rickLidator: true } : null;
}

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query(':enter', stagger('30ms', [animate('400ms', style({ transform: 'translateX(0)' }))]), { optional: true })
      ])
    ])
  ]
})
export class VideoListComponent implements OnDestroy {
  private subscriptions = new Subscription();
  public videos$: Observable<Video[]>;
  public videos: Video[];

  public formGroup: FormGroup;

  routeSearch$: Observable<SearchParams>;

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute, private router: Router) {
    this.formGroup = new FormGroup({
      query: new FormControl('', [Validators.required, rickLidator]),
      age: new FormControl(30, Validators.required)
    });

    // Filters the stream of user input so it emits a value every 500ms max, and no values shorter than 2 chars
    const filteredUserSearch$ = this.formGroup.valueChanges.pipe(
      debounceTime(500),
      tap(g => console.log('GROOUP', g)),
      filter(group => group.query.length > 1)
    );

    // Subscribes to the filtered stream of user input and changes the route (url) accordingly
    this.subscriptions.add(filteredUserSearch$.subscribe(group => this.router.navigate(['videos', group.query, group.age || 30])));

    // Maps the stream of route changes to get the 'query' parameter
    this.routeSearch$ = this.route.paramMap.pipe(map(param => ({ query: param.get('query'), age: +param.get('age') })));

    // Maps the stream of queries to a stream of result from the YoutubeService and exposes it to the view
    // The async pipe in the view will take care of subscribe/unsubscribe
    this.videos$ = this.routeSearch$.pipe(switchMap(searchParams => this.youtubeService.search(searchParams)));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
