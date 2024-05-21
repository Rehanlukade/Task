Certainly! Let's include information about testing in the README:

---

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

