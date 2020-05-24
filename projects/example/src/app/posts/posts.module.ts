import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import {PostsComponent} from './posts.component';
import { PostComponent } from './post/post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxUrqlModule} from 'ngx-urql';


@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    // TODO: What is the best practice for the registation?
    //  forRoot, forChild, and without those Methods is confusing
    NgxUrqlModule,
  ]
})
export class PostsModule { }
