//api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user data from the API', () => {
    const mockUserData = { username: 'testuser', name: 'Test User' };

    service.getUser('testuser').subscribe(userData => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testuser');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  // Add more test cases as needed
});
