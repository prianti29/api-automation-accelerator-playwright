# API Automation Accelerator (Playwright)

[![Playwright](https://img.shields.io/badge/Playwright-1.58.2-28a745.svg)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-blue.svg)](https://nodejs.org/)
[![Ajv](https://img.shields.io/badge/Ajv-Schema--Validation-orange.svg)](https://ajv.js.org/)

A premium API testing accelerator built with **Playwright**, engineered for high-performance, maintainable, and scalable API automation. This project provides a robust foundation for testing the [Swagger Petstore API](https://petstore.swagger.io/) with a focus on contract validation and modular design.

## Key Features

- **Contract Testing**: Automated response validation using `Ajv` against JSON schemas synced with Swagger definitions.
- ** Modular Architecture**: Clean separation of concerns with dedicated support utilities, fixtures, and schema models.
- ** Detailed Reporting**: Rich HTML reports with trace capabilities for debugging.
- ** Advanced Patterns**: 
  - Deep cloning for test data isolation.
  - Reusable API command wrappers (`Support/command.js`).
  - Strict schema validation with custom format support via `ajv-formats`.
- ** Parallel Execution**: Optimized for speed using Playwright's parallel execution engine.

---

## Project Structure

```mermaid
graph TD
    A[Root] --> B["e2e tests"]
    A --> C[Support]
    A --> D[schemas]
    A --> E[fixtures]
    B --> B1[addNewPet.spec.js]
    B --> B2[uploadPetImage.spec.js]
    B --> B3[updateadPet.spec.js]
    B --> B4[assets/]
    C --> C1[command.js - API Wrappers]
    C --> C2[schemaValidator.js]
    C --> C3[apiConstants.js]
    D --> D1[petSchema.json]
    D --> D2[orderSchema.json]
    D --> D3[userSchema.json]
    D --> D4[errorSchema.json]
    E --> E1[addPet.json]
    E --> E2[updatePet.json]
    E --> E3[uploadPetImage.json]
```

- **`e2e tests/`**: Contains end-to-end API test specifications (+ `assets/` for upload binaries).
- **`Support/`**: Core utility layer including API command wrappers, schema validation logic, and global constants.
- **`schemas/`**: JSON Schema definitions (Draft 7) for contract validation (Pet, Order, User, Error).
- **`fixtures/`**: Static test data (JSON) used for request payloads.

---

## 🏁 Getting Started

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

### Run Tests in UI Mode
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

### Multipart File Uploads
We handle complex multipart requests for image uploads with custom metadata support, located in `Support/command.js`.

---

Happy Testing!
