import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import {PostsComponent} from "./posts.component";
import { PostComponent } from './post/post.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
