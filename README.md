# API Automation Accelerator (Playwright)

A premium API testing framework built with Playwright, designed for speed, reliability, and maintainability. This project focuses on automating testing for the Petstore API.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (distributed with Node.js)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests
To execute the API tests, use the following command:
```bash
npx playwright test
```

To view the HTML report after tests complete:
```bash
npx playwright show-report
```

## Project Structure
The project follows a clean, modular architecture:
- `e2e tests/`: Contains all API test specifications (e.g., `uploadPetImage.spec.js`).
- `fixtures/`: Data files used by tests (JSON, images, etc.).
- `support/`: Helper classes and API client wrappers (e.g., `PetApi.js`).
- `tests-examples/`: Playwright's default examples for reference.
- `playwright.config.js`: Centralized configuration for the test runner.

## API Reference
This project interacts with the **Swagger Petstore API**:
- **Swagger UI**: [https://petstore.swagger.io/](https://petstore.swagger.io/)
- **Base URL**: `https://petstore.swagger.io/v2`

## Features
- **Page Object Model (POM)**: Specialized API client classes for cleaner tests.
- **Fixture-Driven Testing**: Separation of test logic and test data.
- **Automated Reporting**: Detailed HTML reports for every test run.
- **Modern Javascript**: Uses ES Modules and async/await for readable code.

---
Built using Playwright.
