import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostDialogComponent } from './my-post-dialog.component';

describe('MyPostDialogComponent', () => {
  let component: MyPostDialogComponent;
  let fixture: ComponentFixture<MyPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
