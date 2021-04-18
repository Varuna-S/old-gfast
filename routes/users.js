async function routes(fastify, options){
    fastify.get('/me', async (request, reply) => {
    
      });
    
    fastify.get('/', async (request, reply) => {
        reply.send(`${request.params.id}`);
    });

    fastify.post('/', async (request, reply) => {

    });
}

module.exports = routes;