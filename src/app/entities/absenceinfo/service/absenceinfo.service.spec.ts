import { TestBed } from '@angular/core/testing';

import { AbsenceinfoService } from './absenceinfo.service';

describe('AbsenceinfoService', () => {
  let service: AbsenceinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
