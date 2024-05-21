import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarComponent } from './search-bar.component';
import { GithubService } from '../../services/github.service';
import { of, throwError } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [GithubService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event and fetch user profile', fakeAsync(() => {
    const emitSpy = spyOn(component.search, 'emit');
    const getUserProfileSpy = spyOn(githubService, 'getUserProfile').and.returnValue(of({}));

    component.username = 'test';
    component.onSearch();
    tick(2); // Advance the virtual clock by 2ms for debounceTime

    expect(emitSpy).toHaveBeenCalledWith('test');
    expect(getUserProfileSpy).toHaveBeenCalledWith('test');
  }));

  it('should not emit search event or fetch user profile if username is empty', () => {
    const emitSpy = spyOn(component.search, 'emit');
    const getUserProfileSpy = spyOn(githubService, 'getUserProfile');

    component.username = '';
    component.onSearch();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(getUserProfileSpy).not.toHaveBeenCalled();
  });

  it('should debounce the search input', fakeAsync(() => {
    const emitSpy = spyOn(component.search, 'emit');

    component.username = 'test';
    component.onSearch(); // Call the onSearch method
    tick(2); // Advance the virtual clock by 2ms

    expect(emitSpy).toHaveBeenCalledWith('test');
  }));

  it('should handle error while fetching user profile', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');
    spyOn(githubService, 'getUserProfile').and.returnValue(throwError(() => new Error('Error fetching user profile')));

    component.username = 'test';
    component.onSearch();
    tick(2); // Advance the virtual clock by 2ms

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching user profile:', jasmine.any(Error));
    expect(component.userProfile).toBeNull();
  }));

  it('should update userProfile on successful fetch', fakeAsync(() => {
    const mockProfile = { name: 'Test User', login: 'testuser', avatar_url: 'testavatarurl' };
    spyOn(githubService, 'getUserProfile').and.returnValue(of(mockProfile));

    component.username = 'test';
    component.onSearch();
    tick(2); // Advance the virtual clock by 2ms

    expect(component.userProfile).toEqual(mockProfile);
  }));

  // Add more test cases as needed
});
