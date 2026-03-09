import { PET } from './apiConstants';

/**
 * Uploads an image for a pet.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {number} petId 
 * @param {string} additionalMetadata 
 * @param {{ name: string, mimeType?: string, buffer: Buffer } | Array<{ name: string, mimeType?: string, buffer: Buffer }>} filePayload
 * @param {string} baseUrl
 */
export async function uploadImage(request, petId, additionalMetadata, filePayload, baseUrl = 'https://petstore.swagger.io/v2') {
     /** @type {Record<string, any>} */
     const multipart = {};

     if (filePayload) {
          if (Array.isArray(filePayload)) {
               filePayload.forEach((file, index) => {
                    const key = index === 0 ? 'file' : `file_${index}`;
                    multipart[key] = {
                         name: file.name,
                         buffer: file.buffer,
                         mimeType: file.mimeType || 'application/octet-stream'
                    };
               });
          } else {
               multipart.file = {
                    name: filePayload.name,
                    buffer: filePayload.buffer,
                    mimeType: filePayload.mimeType || 'application/octet-stream'
               };
          }
     }

     if (additionalMetadata !== undefined) {
          multipart.additionalMetadata = additionalMetadata;
     }

     return await request.post(`${baseUrl}${PET}/${petId}/uploadImage`, {
          multipart
     });
}

/**
 * Adds a new pet to the store.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {object} petData 
 * @param {string} baseUrl
 */
export async function addNewPet(request, petData, baseUrl = 'https://petstore.swagger.io/v2') {
     return await request.post(`${baseUrl}${PET}`, {
          data: petData
     });
}

/**
 * Updates an existing pet in the store.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {object} petData 
 * @param {string} baseUrl
 */
export async function updatePet(request, petData, baseUrl = 'https://petstore.swagger.io/v2') {
     return await request.put(`${baseUrl}${PET}`, {
          data: petData
     });
}
