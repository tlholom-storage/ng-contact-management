/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactInformationService } from './ContactInformation.service';

describe('Service: ContactInformation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactInformationService]
    });
  });

  it('should ...', inject([ContactInformationService], (service: ContactInformationService) => {
    expect(service).toBeTruthy();
  }));
});
