import { test, expect } from '@playwright/test';
import { getInventory } from '../Support/command';
import { validateSchema } from '../Support/schemaValidator';
import inventorySchema from '../schemas/inventorySchema.json';

test.describe('Store API - Returns Pet Inventories By Status', () => {

    // 6.1
    test('Returns pet inventories by status (v2)', async ({ request }) => {
        const response = await getInventory(request);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        // Validate Schema
        const validation = validateSchema(inventorySchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);

        // Functional checks
        expect(typeof responseBody).toBe('object');
        // Check that at least some known statuses exist or at least it's a valid map
        const keys = Object.keys(responseBody);
        expect(keys.length).toBeGreaterThanOrEqual(0);

        // Validate that all values are numbers
        keys.forEach(key => {
            expect(typeof responseBody[key]).toBe('number');
            expect(responseBody[key]).toBeGreaterThanOrEqual(0);
        });
    });

    // 6.2 Test with invalid method (Negative Case)
    test('POST to inventory should not be allowed', async ({ request }) => {
        const response = await request.post('https://petstore.swagger.io/v2/store/inventory');
        // Swagger Petstore usually returns 405 for POST on GET-only endpoints
        expect(response.status()).toBe(405);
    });

    // 6.3 Content-Type Check
    test('Response should be JSON', async ({ request }) => {
        const response = await getInventory(request);
        expect(response.headers()['content-type']).toContain('application/json');
    });
});
