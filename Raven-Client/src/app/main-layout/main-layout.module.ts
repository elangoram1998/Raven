import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FriendSuggestionModule } from '../friend-suggestion/friend-suggestion.module';
import { HomeResolver } from './home.resolver';
import { PostModule } from '../post/post.module';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {
      home: HomeResolver
    }
  }
]

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    FriendSuggestionModule,
    PostModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class MainLayoutModule { }
