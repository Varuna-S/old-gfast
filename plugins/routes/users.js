const {User} = require('../../models/user');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

async function routes(fastify, options){

    //user details of the current logged in user
    fastify.get('/me', async (request, reply) => {
        const user = await User.findById(request.user._id).select('-password');
        reply.send(user);
      });
    
    fastify.get('/', async (request, reply) => {
      const users = await User
        .find()
        .sort({name: 1, isAdmin:1})
        .select('-password');
      reply.send(users);
    });

    //sign up 
    fastify.post('/', async (request, reply) => {
      let user = await User.findOne({email: request.body.email});
    if(user)
        return reply.status(400).send("User already registered with this email");
    user = new User(_.pick(request.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password, salt);
    await user.save();
    reply.send(_.pick(user, ['_id', 'name','email']));
    });
}

module.exports = routes;