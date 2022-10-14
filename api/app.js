const express = require('express');
const path = require('path');
const app = express()
const router = require('./src/router')

//Wire up the router
app.use('/', router)
//Serve static files
app.use(express.static(path.resolve(__dirname, 'uploads')));

//represent the path to index.html
const pathToIndex = path.resolve(__dirname, '../client/index.html')
app.use('/*', (request,response) => {
    response.sendFile(pathToIndex)
})

module.exports = app;

// function filename(request, file, callback) {
//     callback(null, file.originalname)
// }