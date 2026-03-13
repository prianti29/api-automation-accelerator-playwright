import { PET } from './apiConstants';

const BASE_URL = 'https://petstore.swagger.io/v2';

const mapFileToMultipart = (file) => ({
     name: file.name,
     buffer: file.buffer,
     mimeType: file.mimeType || 'application/octet-stream'
});

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


export async function addNewPet(request, petData, baseUrl = BASE_URL) {
     return await request.post(`${baseUrl}${PET}`, {
          data: petData
     });
}

export async function updatePet(request, petData, baseUrl = BASE_URL) {
     return await request.put(`${baseUrl}${PET}`, {
          data: petData
     });
}

export async function getPetByStatus(request, status, baseUrl = BASE_URL) {
     return await request.get(`${baseUrl}${PET}/findByStatus?status=${status}`);
}

export async function getPetByID(request, id, baseUrl = BASE_URL) {
     return await request.get(`${baseUrl}${PET}/${id}`);
}

export async function getPetByFirstAvailableID(request, status, baseUrl = BASE_URL) {
    const statusResponse = await getPetByStatus(request, status, baseUrl);
    const pets = await statusResponse.json();
    
    if (pets && pets.length > 0) {
        const petId = pets[0].id;
        return await getPetByID(request, petId, baseUrl);
    }
    return statusResponse;
}

