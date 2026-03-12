
import { test, expect } from '@playwright/test';
import { getPetByStatus } from '../Support/command';
import { validateSchema } from '../Support/schemaValidator';
import petSchema from '../schemas/petSchema.json';

test.describe('Pet API - Get Pet By Status', () => {
    //4.1
    test('Get pet by available status', async ({ request }) => {
        const response = await getPetByStatus(request, "available");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const validation = validateSchema(petSchema, responseBody[0]);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });
});

