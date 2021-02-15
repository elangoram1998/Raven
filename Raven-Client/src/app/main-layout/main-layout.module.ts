import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FriendSuggestionModule } from '../friend-suggestion/friend-suggestion.module';
import { HomeResolver } from './home.resolver';
import { PostModule } from '../post/post.module';
import { AppRoutingModule } from '../app-routing.module';
import { MyFeedComponent } from './components/my-feed/my-feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {
      home: HomeResolver
    },
    children: [
      { path: '', redirectTo: 'myFeed', pathMatch: 'full' },
      { path: 'myFeed', component: MyFeedComponent }
    ]
  },
]

@NgModule({
  declarations: [MainLayoutComponent, MyFeedComponent, NewPostComponent],
  imports: [
    FriendSuggestionModule,
    PostModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(homeRoutes),
  ]
})
export class MainLayoutModule { }
