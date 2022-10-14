const express = require('express');
const path = require('path');
const app = express()
const router = require('./src/router')


app.use('/', router)
app.use(express.static(path.resolve(__dirname, 'uploads')));

const pathToIndex = path.resolve(__dirname, '../client/index.html')
app.use('/*', (request,response) => {
    response.sendFile(pathToIndex)
})

module.exports = app;

function filename(request, file, callback) {
    callback(null, file.originalname)
}