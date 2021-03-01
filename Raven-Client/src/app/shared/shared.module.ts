import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { IsSamePasswordDirective } from './is-same-password.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    IsSamePasswordDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    //AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    IsSamePasswordDirective
  ]
})
export class SharedModule { }
