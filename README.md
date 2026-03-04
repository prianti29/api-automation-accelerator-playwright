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
The project follows a modular, scalable architecture:
- `e2e tests/`: Contains all API test specifications.
- `schemas/`: JSON schemas used for response contract validation (synced with Swagger).
- `fixtures/`: Data files used by tests (JSON, images, etc.).
- `Support/`: Utility helpers including `schemaValidator.js` and common commands.
- `playwright.config.js`: Centralized configuration for the test runner.

## API Reference
This project interacts with the **Swagger Petstore API**:
- **Swagger UI**: [https://petstore.swagger.io/](https://petstore.swagger.io/)
- **Base URL**: `https://petstore.swagger.io/v2`

## Key Features
- **Contract Testing (Schema Validation)**: Uses `Ajv` to validate API responses against JSON schemas extracted from Swagger.
- **Fixture-Driven Testing**: Separation of test logic and test data for better maintainability.
- **Support Utility**: Centralized `schemaValidator.js` for reusable assertion blocks.
- **Automated Reporting**: Detailed HTML reports for every test run.
- **Deep Data Isolation**: Best practices using deep cloning for test data to prevent state interference.

---
Built using Playwright.
