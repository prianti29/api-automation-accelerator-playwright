import { test, expect } from '@playwright/test';
import { addNewPet } from '../Support/command';
import testData from '../fixtures/addPet.json';
import { validateSchema } from '../Support/schemaValidator';
import petSchema from '../schemas/petSchema.json';
import errorSchema from '../schemas/errorSchema.json';

test.describe('Pet API - Add New Pet', () => {

     //2.1
     test('Add with valid request body', async ({ request }) => {
          const petData = testData[0];
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          // Schema validation
          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.2
     test('Create pet with status = "pending"', async ({ request }) => {
          const petData = testData[1];
          petData.status = "pending";
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });
     //2.3
     test('Create pet with status = "sold"', async ({ request }) => {
          const petData = testData[2];
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.4
     test("Create with only required field", async ({ request }) => {
          const petData = testData[3];
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.5
     test("Create with only ID field", async ({ request }) => {
          const petData = { id: testData[0].id };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(400);

          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Error schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.6
     test("Create without category", async ({ request }) => {
          const petData = testData[0];
          delete petData.category;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.7
     test("Create without tags", async ({ request }) => {
          const petData = testData[0];
          delete petData.tags;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.8
     test("Create without photoUrls", async ({ request }) => {
          const petData = testData[0];
          delete petData.photoUrls;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.9
     test("Create without status", async ({ request }) => {
          const petData = testData[0];
          delete petData.status;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.10
     test("Create without category ID", async ({ request }) => {
          const petData = testData[0];
          delete petData.category.id;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.11
     test("Create without category name", async ({ request }) => {
          const petData = testData[0];
          delete petData.category.name;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.12
     test("Create without tag ID", async ({ request }) => {
          const petData = testData[0];
          delete petData.tags[0].id;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.13
     test("Create without tag name", async ({ request }) => {
          const petData = JSON.parse(JSON.stringify(testData[0]));
          delete petData.tags[0].name;
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.13
     test("Create with empty array of tags", async ({ request }) => {
          const petData = testData[0];
          petData.tags = [];
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).toMatchObject(petData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.14
     test("Create with invalid enum of status", async ({ request }) => {
          const petData = testData[0];
          petData.status = "invalid";
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(400);

          const responseBody = await response.json();
          // Schema validation for error
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Error schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.15
     test("Create with Empty name field", async ({ request }) => {
          const petData = testData[0];
          petData.name = "";
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(400);

          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Error schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.16
     test("Create with null name field", async ({ request }) => {
          const petData = { ...testData[0], name: null };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).not.toHaveProperty('name');

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.17
     test("Create with empty photoURL", async ({ request }) => {
          const petData = { ...testData[0], photoUrls: [""] };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(400);

          const responseBody = await response.json();
          const validation = validateSchema(errorSchema, responseBody);
          expect(validation.valid, `Error schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.18
     test("Create with null ID", async ({ request }) => {
          const petData = { ...testData[0], id: null };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(typeof responseBody.id).toBe('number');
          const { id, ...expectedData } = petData;
          expect(responseBody).toMatchObject(expectedData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.19
     test("Create wtih null category ID", async ({ request }) => {
          const petData = { ...testData[0], category: { id: null } };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(typeof responseBody.category.id).toBe('number');
          const { category: { id }, ...expectedData } = petData;
          expect(responseBody).toMatchObject(expectedData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.20
     test("Create wtih null category name", async ({ request }) => {
          const petData = { ...testData[0], category: { name: null } };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).not.toHaveProperty('category.name');

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.21
     test("Create with null photoURLs", async ({ request }) => {
          const petData = { ...testData[0], photoUrls: [null] };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).not.toHaveProperty('photoUrls[0]');

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.22
     test("Create with null tag ID", async ({ request }) => {
          const petData = { ...testData[0], tags: [{ id: null }] };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(typeof responseBody.tags[0].id).toBe('number');
          const { tags: { id }, ...expectedData } = petData;
          expect(responseBody).toMatchObject(expectedData);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });
     //2.23
     test("Create with null tag name", async ({ request }) => {
          const petData = { ...testData[0], tags: [{ name: null }] };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).not.toHaveProperty('tags[0].name');

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.24
     test("Create with null status", async ({ request }) => {
          const petData = { ...testData[0], status: null };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody).not.toHaveProperty('status');

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });

     //2.25
     test("Create with empty array of photoURLs", async ({ request }) => {
          const petData = { ...testData[0], photoUrls: [] };
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          // Check that it is an empty array
          expect(responseBody.photoUrls).toEqual([]);

          const validation = validateSchema(petSchema, responseBody);
          expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
     });
});
