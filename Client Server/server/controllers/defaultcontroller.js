const basicGetController = (request, response) => {
    response(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My React App</title>
</head>
<body>
    <div id="app"></div>
    <script src="http://localhost:3000/bundle.js"></script>
</body>
</html>
    `)
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