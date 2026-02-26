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
     * @param {{ name: string, mimeType?: string, buffer: Buffer } | Array<{ name: string, mimeType?: string, buffer: Buffer }>} filePayload
     */
    async uploadImage(petId, additionalMetadata, filePayload) {
        /** @type {Record<string, any>} */
        const multipart = {};

        if (filePayload) {
            if (Array.isArray(filePayload)) {
                // Playwright multipart doesn't support arrays for a single key.
                // We use unique keys to avoid the 'stream.on is not a function' crash.
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

        return await this.request.post(`${this.baseUrl}/pet/${petId}/uploadImage`, {
            multipart
        });
    }
}
