const fs = require('fs')

var routes = []
const modelDir = fs.readdirSync(__dirname)

modelDir.map(route => {
    const fileName = route.split('.')[0]
    if(fileName !== 'index'){
        const currentFileRoutes = require(`${__dirname}/${fileName}`)
        routes = [...currentFileRoutes, ...routes]
    }
})

module.exports = routes;