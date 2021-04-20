const {Game} = require('../../models/game');
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {getOptions, postOptions, putOptions, deleteOptions} = require('../../routeOptions/games');


async function routes(fastify, options){
    //GET
    fastify.get('/', async (request, reply) => {
        const games = await Game
            .find()
            .sort({name:1});
        reply.send(games);
      });
    
    fastify.get('/:id', getOptions,async (request, reply) => {
        const game = await Game
            .findOne({ _id: request.params.id})
            .sort({name:1});
        reply.send(game);
    });

    //POST
    fastify.post('/', postOptions, async (request, reply) => {
        const {name, genre, developerName, publisherName, gameEngine, platform, releaseDate} = request.body;
        const game = new Game({
            name,
            genre,
            developerName,
            publisherName,
            gameEngine,
            platform,
            releaseDate
        });
        await game.save();
        reply.send(game);
    });

    //PUT
    fastify.put('/:id', putOptions, async (request, reply) => {
        let game = await Game.findOne({ _id: request.params.id});
        if(!game)
            return reply.status(404).send(`Could not find game with id: ${request.params.id}`);
        const {name, genre, developerName, publisherName, gameEngine, platform, releaseDate} = request.body;
        game.name = name;
        game.genre = genre;
        game.developerName = developerName;
        game.publisherName = publisherName;
        game.gameEngine = gameEngine;
        game.platform = platform;
        game.releaseDate = releaseDate;
        await game.save();
        reply.send(game);
    });

    //PATCH
    fastify.patch('/:id', async (request, reply) => {
        let game = await Game.findOne({ _id: request.params.id});
        if(!game)
            return reply.status(404).send(`Could not find game with id: ${request.params.id}`);

        //picking properties only those which belong to game object from the request.body excluding _id and __v
        //game._doc is where the schema properties are present
        propertiesToUpdate =  _.omit(_.pick(request.body, _.keys(game._doc)), [ '_id', '__v']);

        //assigning the property values from "propertiesToUpdate" object to properties in "game" object
        game = _.assign(game, propertiesToUpdate);

        await game.save();
        reply.send(game);
    });

    //DELETE
    fastify.delete('/:id', deleteOptions, async (request, reply) => {
        let game = await Game.findOneAndRemove({ _id: request.params.id});
        if(!game)
            return reply.status(404).send(`Could not find game with id: ${request.params.id}`);
        reply.send(game);
    });
}

module.exports = routes;