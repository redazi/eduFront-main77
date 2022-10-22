import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: PanierUpdateComponent;
  let fixture: ComponentFixture<PanierUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
