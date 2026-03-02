
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { uploadImage, addNewPet } from '../support/command';
import testData from '../fixtures/addPet.json';

test.describe('Pet API - Add New Pet', () => {

     //1.1
     test('Add with valid request body', async ({ request }) => {
          const petData = testData[0];
          const response = await addNewPet(request, petData);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          expect(responseBody).toMatchObject(petData);
     });

     //1.2
     test('Upload valid image with metadata', async ({ request }) => {
          // Get data from fixture and set image details
          const { id: petId } = testData[0];
          const additionalMetadata = 'Nice photo of my dog';
          const fileName = 'images.jfif';
          const mimeType = 'image/jfif';
          const filePath = path.resolve(__dirname, `assets/${fileName}`);

          // Prepare file payload
          const filePayload = {
               name: fileName,
               mimeType: mimeType,
               buffer: fs.readFileSync(filePath),
          };
          const response = await uploadImage(request, petId, additionalMetadata, filePayload);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();

          expect(responseBody).toMatchObject({
               code: 200,
               type: "unknown",
               message: `additionalMetadata: ${additionalMetadata}\nFile uploaded to ./images.jfif, 12229 bytes`
          });
     });
});
