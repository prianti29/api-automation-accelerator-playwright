
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { uploadImage } from '../support/command';
import testData from '../fixtures/uploadPetImage.json';

test.describe('Pet API - Upload Image', () => {
     //1.1
     test('Upload valid image with metadata', async ({ request }) => {
          // Get data from fixture
          const { petId, additionalMetadata, fileName, mimeType } = testData[0];
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

