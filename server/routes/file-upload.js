var express = require('express');
var router = express.Router();
var fs = require('fs');
const readline = require('readline');
var multer  = require('multer')
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/file-upload',function(req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
            const filePath = path.resolve('uploads', req.file.filename)
            fs.unlinkSync(filePath)
            return next({
                message: 'File not found'
            });
        }
        if(req.file) {
            const filePath = path.resolve('uploads', req.file.filename)
            var stats = fs.stat(filePath, function(err,stat){
                if (stat && stat.isFile() ) {
                    readLines(filePath, res)
                } else {
                    fs.unlinkSync(filePath)
                    return next({
                        message: 'File not found'
                    });
                }
             });
        }
    })
});

function readLines(fileUrl, res) {
    let result = [];
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileUrl),
        output: process.stdout,
        console: false
    });
    readInterface.on('line', function(line) {
        result.push(line)
    });
    readInterface.on('close', function() {
        fs.unlinkSync(fileUrl)
        res.send({ data: result });
    });
}
module.exports = router;
