const express = require('express');
const multer = require('multer');
// const storage = multer.diskStorage({destination:'api/uploads/', filename:filename})
const Router = express.Router();
const router = Router();



//filename handler function
function filename(request, file, callback) {
    return callback(null, file.originalname)
}
//configure Multer diskStorage
const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename
})

//Create the MIME type file filter
function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type'
        callback(null, false, new Error('Wrong file type'))
    } else {
        callback(null, true)
    }
}
//Define the upload callback
const upload = multer({
    fileFilter: fileFilter(), 
    storage: storage 
})
//Create the upload route
router.post('/upload', upload.single('photo'), (request,response) => {
    if (request.fileValidationError) {
        response.status(400).json({error: request.fileValidationError})
    } else {
        response.status(201).json({success: true})
    }
})

module.exports = router