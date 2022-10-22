import { TestBed } from '@angular/core/testing';

import { FormMatiereService } from './form-matiere.service';

describe('FormMatiereService', () => {
  let service: FormMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
