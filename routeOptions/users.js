const {postRequestSchema, putRequestSchema, getRequestSchema, deleteRequestSchema} = require('../validationSchemas/validation');

//GET /api/users/me
const getMeOptions = {
    schema :{
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string'}
                }
            }
        }
    } 
}

//GET /api/users/
const getOptions = {
    schema :{
        response: {
            200: {
                type: 'array',
                items: { type: 'object'}
            }
        }
    }
}

exports.getMeOptions = getMeOptions;
exports.getOptions = getOptions;