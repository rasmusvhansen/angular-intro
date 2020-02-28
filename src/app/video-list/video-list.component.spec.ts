import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { VideoListComponent } from './video-list.component';
import { WordcountDirective } from '../wordcount.directive';
import { EmphasizePipe } from '../emphasize.pipe';
import { VideoComponent } from '../video/video.component';
import { ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../youtube.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let fixture: ComponentFixture<VideoListComponent>;
  let youtubeService: jasmine.SpyObj<YoutubeService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    route = { paramMap: of() } as ActivatedRoute;
    youtubeService = jasmine.createSpyObj<YoutubeService>('youtubeService', ['search']);
    youtubeService.search.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [VideoListComponent, WordcountDirective, EmphasizePipe, VideoComponent],
      providers: [
        { provide: YoutubeService, useValue: youtubeService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change route when field is filled with more than 3 characters', fakeAsync(() => {}));

  it('should show error when age is not selected', fakeAsync(() => {
    // mark form as dirty after setting form control values
    // use fixture.debugElement.query(By.css('.error')) to read errors displayed
  }));

  it('should show error when "rick" is part of the query', fakeAsync(() => {}));

  it('should be valid when age is selected and query valid', fakeAsync(() => {}));

  function advanceFixture() {
    tick(500);
    fixture.detectChanges();
  }
});
