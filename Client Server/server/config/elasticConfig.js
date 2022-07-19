// const elasticsearch = require('@elastic/elasticsearch')
const elasticsearch = require('elasticsearch')

const elasticClient = new elasticsearch.Client({
    // nodes: "http://localhost:9200"
    host: "http://localhost:9200",
    apiVersion: '6.8'
})

elasticClient.ping({
    requestTimeout: 30000,
},
    function (error) {
        if (error) {
            console.error('Cannot connect to Elasticsearch.');
            console.error(error);
        }
        else {
            console.log('Connected to Elasticsearch was successful!');
        }
    });


module.exports = { elasticClient }