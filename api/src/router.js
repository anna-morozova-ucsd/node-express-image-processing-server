const express = require('express');
const Router = express.Router();
const router = Router()
const multer = require('multer')



function filename(request, file, callback) {
    return callback(null, file.originalname())
}
const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename()
})

function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError('Wrong file type')
        callback(null, false, new Error('Wrong file type'))
    } else {
        callback(null, true)
    }
}

const upload = multer({
    fileFilter: fileFilter(), 
    storage: storage 
})

router.post('/upload', upload.single('photo'), (request,response) => {
    if (request.fileValidationError) {
        response.status(400)
        response.json({error: request.fileValidationError})
    } else {
        response.status(201)
        response.json({success: true})
    }
})

module.exports = router