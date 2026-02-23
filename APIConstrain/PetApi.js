// @ts-check

export class PetApi {
    /**
     * @param {import('@playwright/test').APIRequestContext} request
     */
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://petstore.swagger.io/v2';
    }

    /**
     * Uploads an image for a pet.
     * @param {number} petId 
     * @param {string} additionalMetadata 
     * @param {{ name: string, mimeType: string, buffer: Buffer }} filePayload
     */
    async uploadImage(petId, additionalMetadata, filePayload) {
        return await this.request.post(`${this.baseUrl}/pet/${petId}/uploadImage`, {
            multipart: {
                additionalMetadata: additionalMetadata,
                file: filePayload,
            }
        });
    }
}
