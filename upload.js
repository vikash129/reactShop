const multer = require('multer');
var path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname , 'client/public/uploads/images/')))

const date = new Date()

const storage = multer.diskStorage({

    destination: (req , file , callback) => {
        callback(null , 'client/public/uploads/images/')
    } ,
    filename: (req, file, cb) => {
        cb(null, "IMAGE-"  + + date.getFullYear() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 1024 },
});


module.exports = upload