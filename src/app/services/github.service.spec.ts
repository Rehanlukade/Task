import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user profile from API', () => {
    const mockProfile = { login: 'testuser' };
    const username = 'testuser';
    const url = `${service.baseUrl}/${username}`;

    service.getUserProfile(username).subscribe(profile => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should handle error while fetching user profile', () => {
    const username = 'testuser';
    const url = `${service.baseUrl}/${username}`;

    service.getUserProfile(username).subscribe(
      () => fail('Expected error to be thrown'),
      error => {
        expect(error).toContain('Could not fetch user profile');
      }
    );

    const req = httpMock.expectOne(url);
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch repositories from API using default page and perPage values', () => {
    const mockRepos = [{ name: 'repo1' }];
    const username = 'testuser';
    const url = `${service.baseUrl}/${username}/repos?page=1&per_page=10`;

    service.getRepositories(username).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should fetch repositories from API using set page and perPage values', () => {
    const mockRepos = [{ name: 'repo1' }];
    const username = 'testuser';
    const page = 2;
    const perPage = 20;
    const url = `${service.baseUrl}/${username}/repos?page=${page}&per_page=${perPage}`;

    service.setPage(page);
    service.setPerPage(perPage);

    service.getRepositories(username).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should handle error while fetching repositories', () => {
    const username = 'testuser';
    const url = `${service.baseUrl}/${username}/repos?page=1&per_page=10`;

    service.getRepositories(username).subscribe(
      () => fail('Expected error to be thrown'),
      error => {
        expect(error).toContain('Could not fetch repositories');
      }
    );

    const req = httpMock.expectOne(url);
    req.error(new ErrorEvent('Network error'));
  });
});
