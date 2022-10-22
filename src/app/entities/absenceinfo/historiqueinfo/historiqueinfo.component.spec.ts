import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueinfoComponent } from './historiqueinfo.component';

describe('HistoriqueinfoComponent', () => {
  let component: HistoriqueinfoComponent;
  let fixture: ComponentFixture<HistoriqueinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
