const fs = require('fs')

const modelObj = {}
const modelDir = fs.readdirSync(__dirname)

modelDir.map(model => {
    const fileName = model.split('.')[0]
    if(fileName !== 'index'){
        modelObj[fileName] = require(`${__dirname}/${fileName}`)
    }
})

modelDir.map(model => {
    const fileName = model.split('.')[0]
    if(fileName !== 'index' && modelObj[fileName].createAssociation){
        modelObj[fileName].createAssociation(modelObj)
    }
})

module.exports = modelObj;
