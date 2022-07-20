const { elasticClient } = require('../config/elasticConfig')


const deleteQuery = async (elindex, elid) => {
    const deleteVal = await elasticClient.delete({
        index: elindex,
        id: elid
    })

    return deleteVal
}

const createIndex = async (elindex, inputObj) => {
    const response = await elasticClient.index({
        index: elindex,
        type: '_doc',
        body: inputObj
    }, function(err, res){
        console.log(err)
    })
    return response
}

const createBulkIndex = async (body) => {
    console.log("Inside Bulk", body);
    const response = await elasticClient.bulk({
        body: body
    }, function(err, response) {
        if (err) { console.log(err); return; }
        console.log(`Inside bulk3...`);
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
      })
    return response
}

const getQuery = async (elindex) => {
    const getAll = await elasticClient.search({
        index: elindex,
        size: 100
    })
    return getAll
}

const updateQuery = async (elindex, elid, inputObj) => {
    const updateData = await elasticClient.update({
        index: elindex,
        id: elid,
        type: "_doc",
        body: {
            doc: inputObj
        }
    })
    return updateData
}

const searchQuery = async (elindex, keyword) => {
    console.log(elindex, keyword)
    const searchResult = await elasticClient.search({
        index: elindex,
        type: "_doc",
        body: {
            query: {
                match: {
                    last_name: keyword
                }
            }
        }
    })
    return searchResult
}

const multiSearch = async (elindex, keyword) => {
    const result = await elasticClient.msearch({
        body: [
          { index: 'employee' },
          { query: { match: { first_name: keyword } } },
    
          { index: 'employee' },
          { query: { match: { last_name: keyword } } }
        ]
      })

      return result
}

module.exports = { createIndex, createBulkIndex, getQuery, searchQuery, updateQuery,  deleteQuery, multiSearch}