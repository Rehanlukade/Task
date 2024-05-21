// src/app/components/search-bar/search-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  username: string = '';
  userProfile: any = null;
  private searchSubject = new Subject<string>();

  @Output() search = new EventEmitter<string>();

  constructor(private githubService: GithubService) {
    this.searchSubject.pipe(
      debounceTime(1) // Adjust debounce time as needed
    ).subscribe(username => this.search.emit(username));
  }

  onSearch(): void {
    if (this.username.trim() !== '') {
      this.searchSubject.next(this.username);
      this.fetchUserProfile(this.username);
    }
  }

  fetchUserProfile(username: string): void {
    this.githubService.getUserProfile(username).subscribe(
      profile => this.userProfile = profile,
      error => {
        console.error('Error fetching user profile:', error);
        this.userProfile = null;
      }
    );
  }
}
