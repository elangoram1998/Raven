import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule, Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent
  }
]

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class MainLayoutModule { }
