import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material/material/material.module';
// For MDB Angular Free
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md'


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    // MDBBootstrapModule.forRoot(),
    MaterialModule,
    // CarouselModule,
    // ModalModule,
    // WavesModule
  ]
})
export class ProfileModule { }
