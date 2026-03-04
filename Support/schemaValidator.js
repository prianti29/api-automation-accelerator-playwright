const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({
     allErrors: true,
     strict: false // Disable strict mode to allow 'example' and other Swagger keywords
});
addFormats(ajv);

/**
 * Validates a JSON object against a schema.
 * @param {object} schema - The JSON schema to validate against.
 * @param {object} data - The data to validate.
 * @returns {object} - { valid: boolean, errors: string[] }
 */
function validateSchema(schema, data) {
     const validate = ajv.compile(schema);
     const valid = validate(data);
     return {
          valid,
          errors: valid ? [] : validate.errors.map(err => `${err.instancePath} ${err.message}`)
     };
}

module.exports = { validateSchema };
