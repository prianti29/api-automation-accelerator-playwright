
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { uploadImage } from '../Support/command';
import testData from '../fixtures/uploadPetImage.json';
import { validateSchema } from '../Support/schemaValidator';
import errorSchema from '../schemas/errorSchema.json';

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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.2
    test('No metadata (additionalMetadata - optional field empty)', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[0];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, "", filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.3
    test('Only file (no metadata field at all)', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[0];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, undefined, filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.4
    test('Large but acceptable file (~4-5 MB)', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[1];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, undefined, filePayload);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.5
    test('Non-existent petId', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[2];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, undefined, filePayload);
        // Note: Petstore API returns 200 even for non-existent IDs on image upload
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.6
    test('String value on petID', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[3];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, undefined, filePayload);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.7
    test('Missing petID', async ({ request }) => {

        // Get data from fixture
        const { petId, fileName, mimeType } = testData[4];
        const filePath = path.resolve(__dirname, `assets/${fileName}`);

        // Prepare file payload
        const filePayload = {
            name: fileName,
            mimeType: mimeType,
            buffer: fs.readFileSync(filePath),
        };
        const response = await uploadImage(request, petId, undefined, filePayload);
        expect(response.status()).toBe(404);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.8
    test('No file part sent (empty multipart)', async ({ request }) => {

        // Get data from fixture
        const { petId } = testData[1];

        // Sending no file part by passing undefined for filePayload
        const response = await uploadImage(request, petId, undefined, undefined);

        // Note: The user mentioned getting 500 in Postman.
        // If the API returns 500, this test will (correctly) fail if we expect 400.
        expect(response.status()).toBe(400);
        const responseBody = await response.json();

        // Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.9
    test('Invalid file type (.txt or .exe like)', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[5];
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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.10
    test('Zero-byte / empty file', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[6];
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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.11
    test('Very large file (>10-20 MB)', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[7];
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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.12
    test('Special characters in metadata', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[8];
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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.13
    test('Unicode / non-ASCII metadata', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileName, mimeType } = testData[9];
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

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });

    //1.14
    test('Multiple files in one request', async ({ request }) => {

        // Get data from fixture
        const { petId, additionalMetadata, fileNames } = testData[10];

        // Prepare an array of file payloads
        const filePayloads = fileNames.map(name => {
            const filePath = path.resolve(__dirname, `assets/${name}`);
            return {
                name: name,
                buffer: fs.readFileSync(filePath)
            };
        });

        const response = await uploadImage(request, petId, additionalMetadata, filePayloads);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Swagger-based Schema validation
        const validation = validateSchema(errorSchema, responseBody);
        expect(validation.valid, `Schema validation errors: ${validation.errors.join(', ')}`).toBe(true);
    });
});

