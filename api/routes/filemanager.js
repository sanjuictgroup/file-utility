const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const file = "";

const tstorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './tmp/');
    },filename: function(req, file, cb){
        this.file = file.originalname;
        cb(null, this.file);
    }
});

const upload = multer({ storage: tstorage });

// Controllers
const fileManagerController = require('../controller/fileManagerController');


// INITIAL ROUTE
router.get('/', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

router.get('/api', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

/**
 * Route Students CRUD
 * */

router.get('/get-image', fileManagerController.getImage);

router.post('/all-files', fileManagerController.getAllFiles);

router.post('/file-download', fileManagerController.downloadFile);

router.post('/file-upload', upload.single('uploadFiles'), (req, res) => {
        var source = './tmp/' + req.file.originalname;
        var destination = './uploads' + req.body.path + req.file.originalname;
        console.log(source+" ")
        console.log(destination+" ")
        fs.copyFileSync(source, destination)
        console.log("Successfully moved the file or folder")

        fs.rmdir('./tmp/'+req.file.originalname, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        
            console.log(`${'./tmp/'+req.file.originalname} is deleted!`);
        });

        path = './uploads' + req.body.path;
        var str = [];

        fs.readdir(path, function(err, items) {
            
            for (var i=0; i<items.length; i++) {
                str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":"2021-04-29T07:28:45.9055342+00:00","dateCreated":"2021-04-29T07:28:45.6855547+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
            }

            return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
        });
});

module.exports = router;