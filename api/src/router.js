const {Router} = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename()
})

const router = Router()
module.exports = router

function filename(request, file, callback) {
    return callback(null, file.originalname)
}

function fileFilter(request, file, callback) {
    if (file.mimetype != 'image/png') {
        request.fileValidationError = 'Wrong file type'
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