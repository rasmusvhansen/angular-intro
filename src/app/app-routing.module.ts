import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoListComponent } from './video-list/video-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'videos/ambient/30',
    pathMatch: 'full'
  },
  {
    path: 'videos/:query',
    redirectTo: 'videos/:query/30',
    pathMatch: 'full'
  },
  {
    path: 'videos/:query/:age',
    component: VideoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
