const helmet = require('fastify-helmet');

const fastify = require('fastify')({ 
  logger: true,
});



//registering the plugin along with their respective url prefix
fastify.register(helmet);
fastify.register(require('./plugins/startup/dbConnector'));
fastify.register(require('./plugins/routes/homePage'));
fastify.register(require('./plugins/routes/games'), { prefix: '/api/games'});
fastify.register(require('./plugins/routes/users'), { prefix: '/api/users'});
fastify.register(require('./plugins/routes/authn'), { prefix: '/api/authn'});



const port = process.env.PORT || 3000;
const server = fastify.listen(port, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});

module.exports = server;