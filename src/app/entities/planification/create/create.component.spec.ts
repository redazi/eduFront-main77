import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: PlanificationCreateComponent;
  let fixture: ComponentFixture<PlanificationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
