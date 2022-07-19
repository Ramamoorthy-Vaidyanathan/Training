const Models = require('../models/index');
const { createBulkIndex, updateQuery, searchQuery } = require('../elasticQuery/elasticQuery')
const { elasticClient } = require('../config/elasticConfig')
const fs = require('fs')
const path = require('path')

const postEmployee = async (request, response) => {
    response({message: "Under Maintanance!!!!"})
}

const getAllEmployees = async (request, response) => {
    console.log(request.query.search)
    const result = await Models.employee.findAll();
    response(result);
}


module.exports = { postEmployee, getAllEmployees }