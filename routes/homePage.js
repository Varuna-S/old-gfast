async function routes(fastify, options){
    fastify.get('/', async (request, reply) => {
        reply.send('Hello world');
      });
}

module.exports = routes;