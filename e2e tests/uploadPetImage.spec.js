
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PetApi } from '../Support/PetApi';
import testData from '../fixtures/uploadPetImage.json';

test.describe('Pet API - Upload Image', () => {
    //1.1
    test('Upload valid image with metadata', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[0];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

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
            type: "unknown",
            message: `additionalMetadata: ${additionalMetadata}\nFile uploaded to ./images.jfif, 12229 bytes`
        });
    });

    //1.2
    test('No metadata (additionalMetadata - optional field empty)', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[0];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, "", filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('API Response:', JSON.stringify(responseBody, null, 2));
        expect(responseBody).toMatchObject({
            code: 200,
            type: "unknown",
            message: "additionalMetadata: null\nFile uploaded to ./images.jfif, 12229 bytes"
        });
    });

    //1.3
    test('Only file (no metadata field at all)', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[0];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, undefined, filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody).toMatchObject({
            code: 200,
            type: "unknown",
            message: `additionalMetadata: null\nFile uploaded to ./images.jfif, 12229 bytes`
        });
    });

    //1.4
    test('Large but acceptable file (~4-5 MB)', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[1];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, undefined, filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody).toMatchObject({
            code: 200,
            type: "unknown",
            message: `additionalMetadata: null\nFile uploaded to ./images(4-5mb).jpg, 6512976 bytes`
        });
    });

    //1.5
    test('Non-existent petId', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[2];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, undefined, filePayload);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            code: 404,
            type: "unknown",
            message: `Pet not found`
        });
    });

    //1.6
    test('String value on petID', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[3];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, undefined, filePayload);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            code: 404,
            type: "unknown",
            message: "java.lang.NumberFormatException: For input string: \"abc\""
        });
    });

    //1.7
    test('Missing petID', async ({ request }) => {
        const petApi = new PetApi(request);

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[4];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload (Logic moved out of PetApi class)
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await petApi.uploadImage(petId, undefined, filePayload);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            code: 404,
            type: "unknown",
            message: "java.lang.NumberFormatException: For input string: \"undefined\""
        });
    });
});
