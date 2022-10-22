import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDetailComponent } from './detail.component';

describe('FormationDetailComponent', () => {
  let component: FormationDetailComponent;
  let fixture: ComponentFixture<FormationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
