# API Automation Accelerator (Playwright)

[![Playwright](https://img.shields.io/badge/Playwright-1.58.2-28a745.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-blue.svg)](https://nodejs.org/)
[![Ajv](https://img.shields.io/badge/Ajv-Schema--Validation-orange.svg)](https://ajv.js.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A premium API testing accelerator built with **Playwright**, engineered for high-performance, maintainable, and scalable API automation. This project provides a robust foundation for testing the [Swagger Petstore API](https://petstore.swagger.io/) with a focus on contract validation, modular design, and developer experience.

---

## Key Features

- **Contract Testing**: Automated response validation using `Ajv` against JSON schemas synced with Swagger definitions.
- ** Modular Architecture**: Clean separation of concerns with dedicated support utilities, fixtures, and schema models.
- ** Detailed Reporting**: Rich HTML reports with trace capabilities for debugging.
- ** Advanced Patterns**: 
  - Deep cloning for test data isolation.
  - Reusable API command wrappers (`Support/command.js`).
  - Strict schema validation with custom format support via `ajv-formats`.
- **📁 Multipart Handling**: Native support for complex multipart requests (file uploads + metadata).

---

## 📂 Project Architecture

```text
├── .github/              # CI/CD Workflows
├── Support/              # Framework Core & Support Utilities
│   ├── command.js        # API Action Wrappers (Post, Get, Put, etc.)
│   ├── schemaValidator.js # AJV Integration for Contract Testing
│   └── apiConstants.js   # Endpoint & Enumeration Definitions
├── e2e tests/            # Functional Test Suites
├── fixtures/             # Static & Dynamic Test Data
├── schemas/              # JSON Schema Definitions (Contract Models)
├── playwright.config.js  # Framework Configuration
└── package.json          # Dependency & Script Management
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (v7.x or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd api-automation-accelerator-playwright
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Running Tests

### Execute All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npx playwright test addNewPet.spec.js
```

### Run Tests in UI Mode (Developer Experience)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

---

## Technical Deep Dive

### Schema Validation
The project uses `Ajv` to ensure that API responses strictly adhere to the expected structure. This approach catches breaking changes in the API response early.

```javascript
// Example usage in Support/schemaValidator.js
const { validateSchema } = require('./schemaValidator');
const schema = require('../schemas/petSchema.json');

const result = validateSchema(schema, responseBody);
expect(result.valid).toBe(true);
```

---

## Reporting & Analytics

Every test run generates a comprehensive HTML report. To view the latest results, run:
```bash
npm run report
```
The report includes:
- Test status (Pass/Fail/Skipped)
- Execution time
- Detailed request/response logs
- Error stack traces


Happy Testing!
