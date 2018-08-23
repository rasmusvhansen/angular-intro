import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../types';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  @Input()
  video: Video;
}
