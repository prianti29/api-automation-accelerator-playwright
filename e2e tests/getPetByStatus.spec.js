
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

    //4.2
    test('Get pet by pending status', async ({ request }) => {
        const response = await getPetByStatus(request, "pending");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const validation = validateSchema(petSchema, responseBody[0]);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.3
    test('Get pet by sold status', async ({ request }) => {
        const response = await getPetByStatus(request, "sold");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const validation = validateSchema(petSchema, responseBody[0]);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.4
    test('Get pet by invalid status', async ({ request }) => {
        const response = await getPetByStatus(request, "invalid");
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.5
    test('Get pet by empty status', async ({ request }) => {
        const response = await getPetByStatus(request, "");
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.6
    test('Get pet by null status', async ({ request }) => {
        const response = await getPetByStatus(request, null);
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //4.7
    test('Get pet by undefined status', async ({ request }) => {
        const response = await getPetByStatus(request, undefined);
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });
});

