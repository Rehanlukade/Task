import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './repository-list.component';
import { GithubService } from '../../services/github.service';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let githubService: jasmine.SpyObj<GithubService>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const githubServiceSpy = jasmine.createSpyObj('GithubService', ['getRepositories', 'setPage', 'setPerPage']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RepositoryListComponent],
      providers: [
        { provide: GithubService, useValue: githubServiceSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories on username change', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.ngOnChanges({
      username: new SimpleChange('', 'testuser', true)
    });

    expect(githubService.setPage).toHaveBeenCalledWith(1);
    expect(githubService.setPerPage).toHaveBeenCalledWith(10);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should handle error when fetching repositories', () => {
    const errorMessage = 'Could not fetch repositories for testuser';
    githubService.getRepositories.and.returnValue(throwError({ message: errorMessage }));

    component.username = 'testuser';
    component.ngOnChanges({
      username: new SimpleChange('', 'testuser', true)
    });

    expect(githubService.setPage).toHaveBeenCalledWith(1);
    expect(githubService.setPerPage).toHaveBeenCalledWith(10);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.error).toBe('Could not fetch repositories. Please try again later.');
    expect(component.repositories.length).toBe(0);
  });

  it('should fetch repositories on page change', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.page = 2;
    component.onPageChange(2);

    expect(githubService.setPage).toHaveBeenCalledWith(2);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should fetch repositories on page size change', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    const event: any = { target: { value: '20' } };
    component.username = 'testuser';
    component.onPageSizeChange(event);

    expect(githubService.setPerPage).toHaveBeenCalledWith(20);
    expect(component.page).toBe(1);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should go to the previous page', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.page = 2;
    component.previousPage();

    expect(component.page).toBe(1);
    expect(githubService.setPage).toHaveBeenCalledWith(1);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should go to the next page', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.page = 1;
    component.nextPage();

    expect(component.page).toBe(2);
    expect(githubService.setPage).toHaveBeenCalledWith(2);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should handle null target value in onPageSizeChange gracefully', () => {
    const mockRepos = [{ name: 'repo1' }];
    githubService.getRepositories.and.returnValue(of(mockRepos));

    const event = { target: null } as Event;
    component.onPageSizeChange(event);

    expect(githubService.setPerPage).not.toHaveBeenCalled();
    expect(component.page).toBe(1);
    expect(githubService.getRepositories).not.toHaveBeenCalled();
    expect(component.repositories).toEqual([]);
  });

  it('should handle username change when username is null or empty', () => {
    component.username = '';
    component.ngOnChanges({
      username: new SimpleChange(null, '', true)
    });

    expect(githubService.setPage).not.toHaveBeenCalled();
    expect(githubService.setPerPage).not.toHaveBeenCalled();
    expect(githubService.getRepositories).not.toHaveBeenCalled();
    expect(component.error).toBe('');
    expect(component.isLoading).toBe(false);
    expect(component.repositories.length).toBe(0);
  });

  it('should handle empty repositories', () => {
    const mockEmptyRepos: any[] = [];
    githubService.getRepositories.and.returnValue(of(mockEmptyRepos));

    component.username = 'testuser';
    component.ngOnChanges({
      username: new SimpleChange(null, 'testuser', true)
    });

    expect(githubService.setPage).toHaveBeenCalledWith(1);
    expect(githubService.setPerPage).toHaveBeenCalledWith(10);
    expect(githubService.getRepositories).toHaveBeenCalledWith('testuser');
    expect(component.error).toBe('No repositories found for this user.');
    expect(component.repositories).toEqual([]);
  });

  it('should handle fetchRepositories when username is falsy', () => {
    const mockEmptyRepos: any[] = [];
    component.username = '';
    component.fetchRepositories();

    expect(component.error).toBe('');
    expect(component.isLoading).toBe(false);
    expect(component.repositories).toEqual([]);
    expect(githubService.setPage).not.toHaveBeenCalled();
    expect(githubService.setPerPage).not.toHaveBeenCalled();
    expect(githubService.getRepositories).not.toHaveBeenCalled();
  });
});
