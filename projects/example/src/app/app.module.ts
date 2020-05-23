import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUrqlModule } from 'ngx-urql';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUrqlModule.forRoot({
      url: 'https://fakeql.com/graphql/439b33402a495423dbaa6c467a59bcc0'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
