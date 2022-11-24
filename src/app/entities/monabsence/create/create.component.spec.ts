import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonbsenceComponent } from './create.component';

describe('CreateComponent', () => {
  let component: MonbsenceComponent;
  let fixture: ComponentFixture<MonbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
