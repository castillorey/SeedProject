/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtManagerService } from './jwt-manager.service';

describe('Service: JwtManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtManagerService]
    });
  });

  it('should ...', inject([JwtManagerService], (service: JwtManagerService) => {
    expect(service).toBeTruthy();
  }));
});
