const fastify = require('fastify');

//instantiating app
const app = fastify({ logger:true });

//registering the routes along with their respective url prefix
app.register(require('./routes/homePage'));
app.register(require('./routes/games'), { prefix: '/api/games'});
// app.register(require('./routes/users'), { prefix: '/api/users'});



const port = process.env.PORT || 3000;
app.listen(port, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});