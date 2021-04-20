const {postRequestSchema, putRequestSchema, getRequestSchema, deleteRequestSchema} = require('../validation schemas/games');

//route options for the routes
const postOptions = {
    schema: postRequestSchema
}
const putOptions = {
    schema: putRequestSchema,
    validatorCompiler: ({schema, method, url, httpPart }) => {
        return data => schema.validate(data)
    }
}
const getOptions = {
    schema: getRequestSchema,
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

exports.postOptions = postOptions;
exports.putOptions = putOptions;
exports.getOptions = getOptions;
exports.deleteOptions = deleteOptions;