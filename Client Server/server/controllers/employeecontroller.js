const Models = require('../models/index');
const { createBulkIndex, updateQuery, searchQuery, createIndex, getQuery, multiSearch,  } = require('../elasticQuery/elasticQuery')
const { elasticClient } = require('../config/elasticConfig')
const fs = require('fs')
const path = require('path')

const postEmployee = async (request, response) => {
    const fileData = fs.readFileSync(path.join(__dirname, '../data', 'employee.json'))
    const data = JSON.parse(fileData);
    console.log(data.length)
    for(let i=0; i<200; i++){
        console.log(i)
        const result = await createIndex('employee', data[i])
    }       
    response("Data Added");
}

const getAllEmployees = async (request, response) => {
    const queryParam = request.query.search
    console.log(queryParam)
    if(queryParam != ''){
        const result = await multiSearch('employee', queryParam)
        const total = [...result.responses[0].hits.hits, ...result.responses[1].hits.hits]
        response(total)
    }else{
        console.log("Inside Else")
         const result = await getQuery('employee')
        response(result.hits.hits);
    }
    // const result = await Models.employee.findAll();
    // const result = await getQuery('employee')
    // response(result.hits.hits);
    
}


module.exports = { postEmployee, getAllEmployees }