import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { GithubService } from './services/github.service';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SearchBarComponent, RepositoryListComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [GithubService, ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update username when onSearch is called', () => {
    const username = 'testuser';
    component.onSearch(username);
    expect(component.username).toEqual(username);
  });
});
