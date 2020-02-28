import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { VideoListComponent } from './video-list.component';
import { WordcountDirective } from '../wordcount.directive';
import { EmphasizePipe } from '../emphasize.pipe';
import { VideoComponent } from '../video/video.component';
import { ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../youtube.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { routes } from '../app-routing.module';

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

  it('should change route when field is filled with more than 3 characters', fakeAsync(() => {
    component.formGroup.get('query').setValue('query');
    advanceFixture();

    expect(router.navigate).toHaveBeenCalledWith(['videos', 'query', 30]);
  }));

  it('should show error when age is not selected', fakeAsync(() => {
    component.formGroup.get('query').setValue('query');
    component.formGroup.get('age').setValue(null);
    component.formGroup.markAsDirty();
    advanceFixture();

    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeDefined();
    expect(error.nativeElement.innerText).toBe('Age matters. Please correct.');
  }));

  it('should show error when "rick" is part of the query', fakeAsync(() => {
    component.formGroup.get('query').setValue('there is rick in the query');
    component.formGroup.markAsDirty();
    advanceFixture();

    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeDefined();
    expect(error.nativeElement.innerText).toBe('You have inricklidated the form. Please correct.');
  }));

  it('should be valid when age is selected and query valid', fakeAsync(() => {
    component.formGroup.get('query').setValue('ponies');
    component.formGroup.get('age').setValue(60);
    component.formGroup.markAsDirty();
    advanceFixture();

    expect(component.formGroup.valid).toBeTruthy();
  }));

  function advanceFixture() {
    tick(500);
    fixture.detectChanges();
  }
});
