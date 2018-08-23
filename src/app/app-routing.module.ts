import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoListComponent } from './video-list/video-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'videos/ambient',
    pathMatch: 'full'
  },
  {
    path: 'videos/:query',
    component: VideoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
