import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: FormateurUpdateComponent;
  let fixture: ComponentFixture<FormateurUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
