const helmet = require('fastify-helmet');
const fastifyAuth =require('fastify-auth');
const decorators = require('./decorators/authDecorators')
const fastify = require('fastify')({ 
  logger: true,
});



//registering the plugin along with their respective url prefix
fastify.register(helmet);
fastify.register(decorators);
fastify.register(fastifyAuth);
fastify.register(require('./plugins/dbConnector'));
fastify.register(require('./routes/homePage'));
fastify.register(require('./routes/games'), { prefix: '/api/games'});
fastify.register(require('./routes/users'), { prefix: '/api/users'});
fastify.register(require('./routes/authn'), { prefix: '/api/authn'});



const port = process.env.PORT || 3000;
const server = fastify.listen(port, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});

module.exports = server;