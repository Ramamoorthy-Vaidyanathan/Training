//Import Hapi
const Hapi = require('hapi');
const routes = require('./routes/index')
const { sequelize } = require('./config/dbConfig')
require('./models/index')


//Create a new instance of hai server
const server = new Hapi.Server()

//Create a new Connection
server.connection({
    host: 'localhost',
    port: 8080
})

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