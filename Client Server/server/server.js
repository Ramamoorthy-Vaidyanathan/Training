//Import Hapi
const Hapi = require('hapi');
const path = require('path');
const Inert = require('inert');
// const authCookie = require('hapi-auth-cookie');
// const authJwt = require('hapi-auth-jwt2');

const routes = require('./routes/index')
const { sequelize } = require('./config/dbConfig')
const Model = require('./models/index')


//Create a new instance of hai server
const server = new Hapi.Server()

//Create a new Connection
server.connection({
    host: 'localhost',
    port: 8080,
    routes: {
        cors: true
    }
})

//Create Strategy
server.register(
    {
    register: require('hapi-auth-cookie')
}, (err) => {
    if(err){
        console.log("Unable to load plugin!!")
    }
})

const cookieValidation = async (request, session, callback) => {
    const User = await Model.user.findOne({ where: { id: session.id } });
    request.user = User;
    User ? callback(null, true) : callback(null, false)
}

// const jwtValidation = async function(decoded, request, callback){
//     console.log("I am inside JWT Function ")
//     return callback(null, true)
// }

server.auth.strategy('cookie-session', 'cookie', {
    cookie: 'cid',
    password: "ThisIsMyNewCookiePasswordWhichIsGenerated",
    validateFunc: cookieValidation,
    isSecure: false,
    isHttpOnly: false,
    ttl: 3000000,
})

// server.auth.strategy('myjwt', 'jwt', {
//     key: 'javainuse-secret-key',
//     validateFunc: jwtValidation,
// })

server.auth.default('cookie-session')

//Create a  Routes
server.route(routes)

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB()

sequelize.sync()
    .then((res) => console.log("Created Successfully"))
    .catch((err) => console.log(err));

// result: Object.values(data).reduce((a,b) => a+b, 0)

//Start the server

server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server Running in ${server.info.uri}`)
})