const request = require('supertest');
const mongoose = require('mongoose');
const {Game} = require('../../models/game');
const {User} = require('../../models/user');
const fastify = require('fastify');
const app = require('../../app');
const server = fastify({logger: true}); 
    
describe('/api/games', () =>{
    let token;
    let game;
    beforeEach(async () => {
        server.register(app);
        await server.ready();
        if(process.env.NODE_ENV === 'test')
            await Game.deleteMany({});
        token = new User({isAdmin: true}).generateAuthToken();
    });
    afterEach( async () => {
        await server.close();
        await Game.deleteMany({});
    });
    describe('GET /', () => {
        beforeEach(async () => {
            game = new Game({
                name:"Nioh 2",
                genre:"Action role playing",  
                developerName:"Team Ninja", 
                publisherName:"Sony Interactive Entertainment", 
                gameEngine:"Team Ninja proprietary engine ",
                platform:"PlayStation 4, Microsoft Windows, PlayStation 5",
                releaseDate:"2020-10-13"
            });
            await game.save();
        });
        it('should return all games', async () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200);
        });       
    });
});