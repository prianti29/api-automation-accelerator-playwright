// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PetApi } from '../APIConstrain/PetApi';
import testData from '../fixtures/uploadPet.json';

test('Upload valid image with metadata', async ({ request }) => {
    const petApi = new PetApi(request);

    // Get data from fixture
    const { petId, additionalMetadata, fileName, mimeType } = testData;
    const filePath = path.resolve(__dirname, `assets/${fileName}`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at ${filePath}`);
    }

    // Prepare file payload (Logic moved out of PetApi class)
    const filePayload = {
        name: fileName,
        mimeType: mimeType,
        buffer: fs.readFileSync(filePath),
    };

    const response = await petApi.uploadImage(petId, additionalMetadata, filePayload);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toMatchObject({
        code: 200,
        type: "unknown"
    });

    expect(responseBody.message).toContain(`additionalMetadata: ${additionalMetadata}`);
    expect(responseBody.message).toContain("File uploaded to");
});
