import { TestBed, inject } from '@angular/core/testing';

describe('ProjectsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should be created', inject([], (service: any) => {
    expect(service).toBeTruthy();
  }));
});
