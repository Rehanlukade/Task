import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnChanges {
  @Input() username: string = '';
  repositories: any[] = [];
  page: number = 1;
  perPage: number = 10;
  pageSizes: number[] = [10, 20, 50, 100];
  error: string = '';
  isLoading: boolean = false;

  constructor(private githubService: GithubService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && this.username) {
      this.page = 1;
      this.fetchRepositories();
    }
  }

  fetchRepositories(): void {
    if (!this.username) {
      this.error = '';
      this.repositories = [];
      this.isLoading = false;
      return; // Exit early if username is falsy
    }

    this.isLoading = true;
    this.error = '';
    this.repositories = [];

    this.githubService.setPage(this.page);
    this.githubService.setPerPage(this.perPage);

    this.githubService.getRepositories(this.username).subscribe(
      (data: any[]) => {
        this.repositories = data;
        if (data.length === 0) {
          this.error = 'No repositories found for this user.';
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching repositories:', error);
        this.error = 'Could not fetch repositories. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchRepositories();
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.perPage = Number(target.value);
      this.page = 1;
      this.fetchRepositories();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchRepositories();
    }
  }

  nextPage(): void {
    this.page++;
    this.fetchRepositories();
  }
}
