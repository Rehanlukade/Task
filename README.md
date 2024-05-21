
# GitHub Repositories Listing Page

## Introduction

This Angular application is designed to fetch and display public GitHub repositories of a user. It provides a user-friendly interface to search for GitHub users and view their repositories with pagination and skeleton loading features.

![GitHub Repositories Topics](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7743fc64-964a-4fb2-a231-d646d2d88e0a/Screenshot_2021-05-17_at_3.11.10_AM.png)

## Getting Started

### Prerequisites

Before getting started, ensure you have the following prerequisites installed:

- **Angular CLI**: Install Angular CLI globally by running the command:

  ```bash
  npm install -g @angular/cli
  ```

### Installation

Follow these steps to set up the project:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/github-repositories-listing.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd github-repositories-listing
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

1. **Start the development server**:

   ```bash
   ng serve
   ```

2. **Open your browser** and visit `http://localhost:4200/` to view the application.

3. **Search for GitHub users**: Enter a GitHub username in the search bar and click the search button to fetch and display the user's repositories.

## Features

- **Search Functionality**: Search GitHub users and display their repositories.
- **Pagination**: Server-side pagination with customizable page sizes.
- **Skeleton Loading**: Provides a skeleton loading UI while data is being fetched.
- **Error Handling**: Handles errors gracefully for failed API requests.
- **Unit Tests**: Includes unit tests for components and services with 100% code coverage.

## Testing

This project includes comprehensive unit tests for components and services to ensure code quality and reliability. To run the tests, follow these steps:

1. **Navigate to the project directory**:

   ```bash
   cd github-repositories-listing
   ```

2. **Run the tests**:

   ```bash
   ng test
   ```
Certainly! Let's provide a more detailed explanation of the features implemented in the application along with insights into unit testing.

### Features

#### Search Functionality

- **Description**: Users can input a GitHub username into the search bar.
- **Implementation**: The `search-bar` component handles user input and triggers a search event when the user clicks the search button.
- **Unit Testing**: Unit tests ensure that the search functionality correctly emits search events and fetches user profiles from the GitHub API.

#### Display of GitHub Repositories

- **Description**: The application fetches and displays public repositories belonging to the specified GitHub user.
- **Implementation**: The `repository-list` component manages the display of repositories, including pagination, skeleton loading, and error handling.
- **Unit Testing**: Unit tests verify that repositories are fetched and displayed correctly, pagination works as expected, and error handling functions properly.

#### Pagination

- **Description**: Users can navigate through multiple pages of repositories.
- **Implementation**: Pagination controls allow users to change the number of items displayed per page and navigate between pages.
- **Unit Testing**: Unit tests ensure that pagination controls update the page number correctly and fetch repositories for the selected page size.

#### Skeleton Loading

- **Description**: Skeleton loading placeholders are displayed while repositories are being fetched.
- **Implementation**: Skeleton loading elements provide a visual indication of content loading to improve the user experience.
- **Unit Testing**: Unit tests verify that skeleton loading is displayed while repositories are being fetched and disappears once data is loaded.

### Unit Testing

#### Repository List Component Tests

- **Purpose**: Ensure that the repository list component functions correctly in various scenarios.
- **Tests**:
  - Verify that repositories are fetched and displayed when a username is provided.
  - Test error handling when repositories cannot be fetched.
  - Ensure that pagination controls update the page number and fetch repositories accordingly.
  - Test that pagination works as expected when navigating between pages.
  - Verify that skeleton loading is displayed while repositories are being fetched.

#### Search Bar Component Tests

- **Purpose**: Confirm that the search bar component handles user input and emits search events properly.
- **Tests**:
  - Ensure that search events are emitted when the search button is clicked.
  - Test that user input is captured correctly and triggers search events.
  - Verify error handling when fetching user profiles encounters an error.

### Overall Testing Approach

- **Coverage**: Aim for 100% code coverage to ensure that all components and services are thoroughly tested.
- **Integration Testing**: Conduct integration tests to ensure that components interact correctly with services and external APIs.
- **Edge Cases**: Test edge cases, such as empty responses or unexpected API behavior, to ensure robustness.
- **Mocking**: Use mocks and stubs to isolate components and services during testing and simulate different scenarios.
- **Continuous Integration**: Integrate testing into the development workflow using continuous integration tools to catch errors early and maintain code quality.

3. **View test coverage**: After running the tests, you can view the test coverage report in the terminal or by opening the generated `coverage` folder in the project directory.

## Contributing

We welcome contributions to improve this project! To contribute, follow these steps:

1. **Fork** the repository.
2. Create a new **feature branch** (`git checkout -b feature/YourFeature`).
3. **Commit** your changes (`git commit -am 'Add some feature'`).
4. **Push** to the branch (`git push origin feature/YourFeature`).
5. Create a new **Pull Request**.

## License

This project is licensed under the [MIT License](LICENSE).

