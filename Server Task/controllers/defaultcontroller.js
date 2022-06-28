const basicGetController = (request, response) => {
    console.log(request.query)
    response("<h1> Hello World! </h1>")
}

const paramsController = (request, response) => {
    response(`<h1> Hello ${request.params.name} </h1>`)
}

const addController = (request, response) => {
    const data = request.payload
    console.log(data)
    response({
        result: data.num1 + data.num2
    })
}


module.exports = { addController, basicGetController, paramsController }