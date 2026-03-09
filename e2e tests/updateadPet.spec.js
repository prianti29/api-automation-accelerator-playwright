import { test, expect } from '@playwright/test';
import { updatePet } from '../Support/command';
import testData from '../fixtures/updatePet.json';
import { validateSchema } from '../Support/schemaValidator';
import petSchema from '../schemas/petSchema.json';

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
});
