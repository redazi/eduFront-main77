import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierListComponent } from './list.component';

describe('ListComponent', () => {
  let component: PanierListComponent;
  let fixture: ComponentFixture<PanierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
