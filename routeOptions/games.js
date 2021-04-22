const {getRequestSchema, postRequestSchema, putRequestSchema, patchRequestSchema,deleteRequestSchema} = require('../validationSchemas/validation');

//route options for the routes
const getOptions = {
    schema: getRequestSchema,
    validatorCompiler: ({schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    },
    response: {
        200: {
            type: 'object',
            properties: {
                _id: { type: 'string'},
                isAdmin: { type: 'boolean'},
                name:{ type: 'string'},
                email: { type: 'string'}
            }
        }
    }
}

const postOptions = {
    schema: postRequestSchema
}

const putOptions = {
    schema: putRequestSchema,
    validatorCompiler: ({schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
}
const patchOptions = {
    schema: patchRequestSchema,
    validatorCompiler: ({schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
}

const deleteOptions = {
    schema: deleteRequestSchema,
    validatorCompiler: ({schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
}
exports.getOptions = getOptions;
exports.postOptions = postOptions;
exports.putOptions = putOptions;
exports.patchOptions = patchOptions;
exports.deleteOptions = deleteOptions;