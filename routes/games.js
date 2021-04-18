
const {Game} = require('../models/game');

async function routes(fastify, options){
    fastify.get('/', async (request, reply) => {
        const games = await Game
            .find()
            .sort({name:1});
        reply.send(games);
      });
    
    fastify.get('/:id', async (request, reply) => {
        reply.send(`${request.params.id}`);
    });

    fastify.post('/', async (request, reply) => {
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

    fastify.put('/:id', async (request, reply) => {
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
}

module.exports = routes;