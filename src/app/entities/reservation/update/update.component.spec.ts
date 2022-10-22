import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: ReservationUpdateComponent;
  let fixture: ComponentFixture<ReservationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
