import { PET } from './apiConstants';

const BASE_URL = 'https://petstore.swagger.io/v2';

/**
 * Common configuration for multipart file upload.
 * @param {object} file 
 * @returns {object}
 */
const mapFileToMultipart = (file) => ({
     name: file.name,
     buffer: file.buffer,
     mimeType: file.mimeType || 'application/octet-stream'
});

/**
 * Uploads an image for a pet.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {number} petId 
 * @param {string} [additionalMetadata] 
 * @param {{ name: string, mimeType?: string, buffer: Buffer } | Array<{ name: string, mimeType?: string, buffer: Buffer }>} [filePayload]
 * @param {string} [baseUrl]
 */
export async function uploadImage(request, petId, additionalMetadata, filePayload, baseUrl = BASE_URL) {
     const multipart = {};

     if (filePayload) {
          const files = Array.isArray(filePayload) ? filePayload : [filePayload];
          files.forEach((file, index) => {
               const key = index === 0 ? 'file' : `file_${index}`;
               multipart[key] = mapFileToMultipart(file);
          });
     }

     if (additionalMetadata !== undefined) {
          multipart.additionalMetadata = additionalMetadata;
     }

     return await request.post(`${baseUrl}${PET}/${petId}/uploadImage`, { multipart });
}

/**
 * Adds a new pet to the store.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {object} petData 
 * @param {string} [baseUrl]
 */
export async function addNewPet(request, petData, baseUrl = BASE_URL) {
     return await request.post(`${baseUrl}${PET}`, {
          data: petData
     });
}

/**
 * Updates an existing pet in the store.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {object} petData 
 * @param {string} [baseUrl]
 */
export async function updatePet(request, petData, baseUrl = BASE_URL) {
     return await request.put(`${baseUrl}${PET}`, {
          data: petData
     });
}
