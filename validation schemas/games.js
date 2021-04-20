const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

gameInputProperties = {
    name: {type: 'string', minLength:1, maxLength: 150},
    genre: {type: 'string', minLength:1, maxLength: 150},
    developerName:{type: 'string', minLength:1, maxLength: 150},
    publisherName:{type: 'string', minLength:1, maxLength: 150},
    gameEngine:{type: 'string', minLength:1, maxLength: 100},
    platform:{type: 'string', minLength:1, maxLength: 175},
    releaseDate:{type: 'string', format: 'date'}
};

//request body schema
const requestBodySchema = {
    type: 'object',
    required: ['name', 'genre', 'developerName', 'publisherName', 'gameEngine', 'platform', 'releaseDate'],
    properties: gameInputProperties
}

//Joi schema for validating id in params 
const paramsSchema = {
        id: Joi.objectId().required()  
}
const getRequestSchema = {
    params: Joi.object().keys(paramsSchema).required()
}



//input validation schema for the routes
const postRequestSchema = {
    body: requestBodySchema
}
const  putRequestSchema ={
    body: requestBodySchema,
    params : Joi.object().keys(paramsSchema).required()
}
const  deleteRequestSchema ={
    params : Joi.object().keys(paramsSchema).required()
}



exports.postRequestSchema = postRequestSchema;
exports.putRequestSchema = putRequestSchema;
exports.getRequestSchema = getRequestSchema;
exports.deleteRequestSchema = deleteRequestSchema;