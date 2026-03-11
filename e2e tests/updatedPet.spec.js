import { test, expect } from '@playwright/test';
import { updatePet } from '../Support/command';
import testData from '../fixtures/updatePet';
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

     //3.15
     test('Update with null name', async ({ request }) => {
          const petData = testData[14];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Create a copy of expected data without name to verify other fields
          const { name, ...expectedData } = petData;
          expect(responseBody).toMatchObject(expectedData);

          // Verify that the name field is not present in the response
          expect(responseBody.name).toBeUndefined();

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Ensure the response follows the schema structure and log any mismatches
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(false);
     });

     //3.16  
     test('Update with null photoURL', async ({ request }) => {
          const petData = testData[15];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Create a copy of expected data without name to verify other fields
          const { photoUrls, ...expectedData } = petData;
          expect(responseBody).toMatchObject(expectedData);

          // Verify that the photoUrls field is not present in the response
          expect(responseBody.photoUrls).toBeUndefined();

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Ensure the response follows the schema structure and log any mismatches
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(false);
     });

     //3.17
     test('Update with null ID', async ({ request }) => {
          const petData = testData[16];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Ensure the response follows the schema structure and log any mismatches
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.18
     test('Update with null category name', async ({ request }) => {
          const petData = testData[17];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Destructure to separate the null 'name' from the inner 'category' object
          const { category: { name, ...categoryData }, ...expectedData } = petData;

          // Verify that the response matches the expected data (excluding the null field)
          expect(responseBody).toMatchObject({
               ...expectedData,
               category: categoryData
          });

          // Verify that the 'name' field inside category is not present in the response
          expect(responseBody.category?.name).toBeUndefined();

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Since category name isn't marked as 'required' in your schema, this should be valid
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.19
     test('Update with null tags ID', async ({ request }) => {
          const petData = testData[18];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Destructure to separate the null 'id' from the first tag in the array
          const { tags: [{ id, ...firstTagData }, ...otherTags], ...expectedData } = petData;

          // Verify that the response matches the expected data (excluding the null field)
          expect(responseBody).toMatchObject({
               ...expectedData,
               tags: [firstTagData, ...otherTags]
          });

          // Verify that the 'id' field in the first tag returns 0 (API default for null integer)
          expect(responseBody.tags[0]?.id).toBe(0);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Tags ID is optional in your schema, so this should pass
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.20
     test('Update with null tags name', async ({ request }) => {
          const petData = testData[19];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Destructure to separate the null 'name' from the first tag in the array
          const { tags: [{ name, ...firstTagData }, ...otherTags], ...expectedData } = petData;

          // Verify that the response matches the expected data (excluding the null field)
          expect(responseBody).toMatchObject({
               ...expectedData,
               tags: [firstTagData, ...otherTags]
          });

          // Verify that the 'name' field in the first tag is not present in the response
          expect(responseBody.tags[0]?.name).toBeUndefined();

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          // Since tags name isn't marked as 'required' in your schema, this should be valid
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //3.21
     test('Update with null status', async ({ request }) => {
          const petData = testData[20];
          const response = await updatePet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          // Verify that the status field is not present in the response
          expect(responseBody.status).toBeUndefined();

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });
});
