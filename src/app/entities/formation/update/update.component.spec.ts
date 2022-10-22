import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: FormationUpdateComponent;
  let fixture: ComponentFixture<FormationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
