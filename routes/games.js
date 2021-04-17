
async function routes(fastify, options){
    fastify.get('/', async (request, reply) => {
        reply.send('GET /api/games');
      });
    
    fastify.get('/:id', async (request, reply) => {
        reply.send(`${request.params.id}`);
    });
}

module.exports = routes;