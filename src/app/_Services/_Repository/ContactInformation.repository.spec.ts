/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactInformationRepository } from './ContactInformation.repository';

describe('Service: ContactInformationRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactInformationRepository]
    });
  });

  it('should ...', inject([ContactInformationRepository], (service: ContactInformationRepository) => {
    expect(service).toBeTruthy();
  }));
});
