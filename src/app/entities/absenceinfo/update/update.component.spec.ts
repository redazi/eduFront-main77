import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceinfoUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: AbsenceinfoUpdateComponent;
  let fixture: ComponentFixture<AbsenceinfoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceinfoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceinfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
