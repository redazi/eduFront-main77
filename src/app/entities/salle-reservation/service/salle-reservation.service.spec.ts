import { TestBed } from '@angular/core/testing';

import { SalleReservationService } from './salle-reservation.service';

describe('SalleReservationService', () => {
  let service: SalleReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
