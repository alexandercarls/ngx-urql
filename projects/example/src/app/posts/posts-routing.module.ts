import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from "./posts.component";
import {PostComponent} from "./post/post.component";


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: ':id',
        component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
