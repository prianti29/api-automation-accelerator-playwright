
import { test, expect } from '@playwright/test';
import { getPetByID, getPetByStatus, getPetByFirstAvailableID } from '../Support/command';
import { validateSchema } from '../Support/schemaValidator';
import petSchema from '../schemas/petSchema.json';
import errorSchema from '../schemas/errorSchema.json';

test.describe('Pet API - Get Pet By ID', () => {
    //4.1
    test('Get pet by valid ID', async ({ request }) => {
        const response = await getPetByFirstAvailableID(request, "available");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const validation = validateSchema(petSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.2
    test('Get with invalid ID', async ({ request }) => {
        const response = await getPetByID(request, "invalid");
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.3
    test('Get with null ID', async ({ request }) => {
        const response = await getPetByID(request, null);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.4
    test('Get with undefined ID', async ({ request }) => {
        const response = await getPetByID(request, undefined);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.5
    test('Get with empty ID', async ({ request }) => {
        const response = await getPetByID(request, "");
        expect(response.status()).toBe(405);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });
});

