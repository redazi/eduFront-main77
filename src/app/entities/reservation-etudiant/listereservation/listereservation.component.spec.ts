import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListereservationComponent } from './listereservation.component';

describe('ListereservationComponent', () => {
  let component: ListereservationComponent;
  let fixture: ComponentFixture<ListereservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListereservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListereservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
