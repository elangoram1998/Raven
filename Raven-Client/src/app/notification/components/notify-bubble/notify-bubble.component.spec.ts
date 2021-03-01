import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyBubbleComponent } from './notify-bubble.component';

describe('NotifyBubbleComponent', () => {
  let component: NotifyBubbleComponent;
  let fixture: ComponentFixture<NotifyBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
