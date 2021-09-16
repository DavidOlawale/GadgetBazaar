import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerGuardGuard } from './customer-guard.guard';

describe('CustomerGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGuardGuard]
    });
  });

  it('should ...', inject([CustomerGuardGuard], (guard: CustomerGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
