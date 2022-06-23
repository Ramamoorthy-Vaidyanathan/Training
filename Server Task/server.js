//Import Hapi
const Hapi = require('hapi');
const defaultRoutes = require('./routes/defaultroutes')

//Create a new instance of hai server
const server = new Hapi.Server()

//Create a new Connection
server.connection({
    host: 'localhost',
    port: 8080
})

//Create a  Routes
server.route(defaultRoutes)

// result: Object.values(data).reduce((a,b) => a+b, 0)

//Start the server

server.start((err) => {
    if(err){
        throw err
    }
    console.log(`Server Running in ${server.info.uri}`)
})