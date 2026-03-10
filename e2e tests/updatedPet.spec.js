import { test, expect } from '@playwright/test';
import { updatePet } from '../Support/command';
import testData from '../fixtures/updatePet.json';
import { validateSchema } from '../Support/schemaValidator';
import petSchema from '../schemas/petSchema.json';
import errorSchema from '../schemas/errorSchema.json';

test.describe('Pet API - Update Pet', () => {

     //3.1
     test('Update with valid request body', async ({ request }) => {
          const petData = testData[0];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.2
     test('Update pet name', async ({ request }) => {
          const petData = testData[1];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(404);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.3
     test('Update photoURLs', async ({ request }) => {
          const petData = testData[2];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(404);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.4
     test('Update ID', async ({ request }) => {
          const petData = testData[3];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(400);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.5
     test('Update category', async ({ request }) => {
          const petData = testData[4];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(404);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.6
     test('Update tags', async ({ request }) => {
          const petData = testData[5];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(404);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.7
     test('Update status', async ({ request }) => {
          const petData = testData[6];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(404);
          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.8
     test('Update name with required fields', async ({ request }) => {
          const petData = testData[7];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.9
     test('Update photoURLs with required fields', async ({ request }) => {
          const petData = testData[8];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.10
     test('Update category ID with required fields', async ({ request }) => {
          const petData = testData[9];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.11
     test('Update category name with required fields', async ({ request }) => {
          const petData = testData[10];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.12
     test('Update tags ID with required fields', async ({ request }) => {
          const petData = testData[11];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.13
     test('Update tags name with required fields', async ({ request }) => {
          const petData = testData[12];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.14
     test('Update with invalid photo URL', async ({ request }) => {
          const petData = testData[13];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(400);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });
});
