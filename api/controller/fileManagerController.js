const fs = require("fs");
const { async } = require('rxjs');
const { imgAbsolute } = require('../constants');

var size = "";
var isFile = false;
var ctime = "";
var mtime = "";
var ext = ""; 
var virginPath = "";

exports.getImage = async (req, res) => {
    return res.sendFile(imgAbsolute + req.query.path);
}

exports.downloadFile = async (req, res) => {

    const data = JSON.parse(req.body.downloadInput);

    if(data.action == "download"){

        for (var i=0; i<data.names.length; i++) {
            // Url of the image
            console.log(data.names[i])
            if(data.names[i] == null){
                path = './uploads' + req.body.path;
                var str = [];
        
                fs.readdir(path, function(err, items) {
                    
                    for (var i=0; i<items.length; i++) {
                        str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":"2021-04-29T07:28:45.9055342+00:00","dateCreated":"2021-04-29T07:28:45.6855547+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
                    }
        
                    return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
                });
            }

            const file = data.names[i];
            // Path at which image will get downloaded
            const filePath = './uploads' + data.path + file;
            console.log(filePath)
            
           res.download(filePath, data.names[i])
        }

    }
}

exports.getAllFiles = async (req, res) =>{
    try{

        /**
         * Create Files & Folder
         */
        if(req.body.action == "create"){

            if (fs.existsSync('./uploads'+req.body.path+req.body.name)) {
                return res.status(200).json({
                    "cwd":null,
                    "files":null,
                    "error":{
                       "code":"400",
                       "message":"A file or folder with the name "+`${req.body.name}`+" already exists.",
                       "fileExists":null
                    },
                    "details":null
                 });
            }
            
            fs.mkdirSync('./uploads'+req.body.path+req.body.name, { recursive: true })

            return res.status(200).json({
                "cwd":null,
                "files":[
                   {
                      "path":null,
                      "action":null,
                      "newName":null,
                      "names":null,
                      "name":"Textile",
                      "size":0,
                      "previousName":null,
                      "dateModified":"2021-04-29T08:52:42.7815573+00:00",
                      "dateCreated":"2021-04-29T08:52:42.7815573+00:00",
                      "hasChild":false,
                      "isFile":false,
                      "type":"",
                      "id":null,
                      "filterPath":null,
                      "filterId":null,
                      "parentId":null,
                      "targetPath":null,
                      "renameFiles":null,
                      "uploadFiles":null,
                      "caseSensitive":false,
                      "searchString":null,
                      "showHiddenItems":false,
                      "data":null,
                      "targetData":null,
                      "permission":null
                   }
                ],
                "error":null,
                "details":null
             });
        }

         /**
         * Listing Files & Folder
         */
        if(req.body.action == "read"){

            const path = "./uploads"+req.body.path;
            const orignalPath = "/uploads"+req.body.path;
            var str = [];
        
            fs.readdir(path, function(err, items) {
                
                for (var i=0; i<items.length; i++) {

                    var state = fs.statSync(path+items[i]);
                    this.isFile = state.isFile();
                    this.ext = "."+items[i].split('.').pop();
                    this.virginPath = orignalPath;
                    this.ctime = state.ctime;
                    this.mtime = state.mtime;

                    if(!this.isFile){
                       this.ext = "";
                    }

                    str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":this.mtime,"dateCreated":this.ctime,"hasChild":false,"isFile":this.isFile,"type":`${this.ext}`,"id":null,"filterPath":this.virginPath,"filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
                }
        
                return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
            });
        }

         /**
         * Rename Files & Folder
         */
        if(req.body.action == "rename"){

            const oldName = './uploads/'+req.body.name;
            const newName = './uploads/'+req.body.newName;

            fs.rename(oldName, newName, (err) => {
                if(err) {
                    throw err;
                }
            
                console.log("Directory renamed successfully.");
            });

            return res.status(200).json({"cwd":null,"files":[{"path":null,"action":null,"newName":null,"names":null,"name":`${newName}`,"size":0,"previousName":null,"dateModified":"2021-04-29T11:40:21.2595215+00:00","dateCreated":"2021-04-29T11:40:21.2595215+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null}],"error":null,"details":null});
        }
        
         /**
         * Delete Files & Folder
         */
        if(req.body.action == "delete"){

            var path = './uploads'+req.body.path+req.body.names[0];
        
            console.log(path)
        
            fs.rmdir(path, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            
                console.log(`${path} is deleted!`);
            });

            path = "./uploads";
            var str = [];
        
            fs.readdir(path, function(err, items) {
                console.log(items);
             
                for (var i=0; i<items.length; i++) {
                   str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":"2021-04-29T07:28:45.9055342+00:00","dateCreated":"2021-04-29T07:28:45.6855547+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
                }
        
                return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
            });
        
        }

         /**
         * Copy Files & Folder
         */
        if(req.body.action == "copy"){

            for (var i=0; i<req.body.names.length; i++) {
                console.log(i+" ")
            
                    console.log(" yes ")
                    var source = './uploads'+req.body.path+req.body.names[i];
                    var destination = './uploads'+req.body.targetPath+req.body.names[i];
                    console.log(source+" ")
                    console.log(destination+" ")
                    fs.copyFileSync(source, destination)
                    console.log("Successfully copied the file or folder")
                
            }

            path = "./uploads";

            var str = [];
        
            fs.readdir(path, function(err, items) {
             
                for (var i=0; i<items.length; i++) {
                   str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":"2021-04-29T07:28:45.9055342+00:00","dateCreated":"2021-04-29T07:28:45.6855547+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
                }
        
                return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
            });
        }

         /**
         * Move Or Cut Files & Folder
         */
        if(req.body.action == "move"){

            for (var i=0; i<req.body.names.length; i++) {

                    var source = './uploads'+req.body.path+req.body.names[i];
                    var destination = './uploads'+req.body.targetPath+req.body.names[i];
                    console.log(source+" ")
                    console.log(destination+" ")
                    fs.copyFileSync(source, destination)
                    console.log("Successfully copied the file or folder")

                    fs.rmdir('./uploads'+req.body.path+req.body.names[i], { recursive: true }, (err) => {
                        if (err) {
                            throw err;
                        }
                    
                        console.log(`${path} is deleted!`);
                    });
            }

            path = "./uploads";
            var str = [];
        
            fs.readdir(path, function(err, items) {
             
                for (var i=0; i<items.length; i++) {
                   str[i] = {"path":null,"action":null,"newName":null,"names":null,"name":`${items[i]}`,"size":0,"previousName":null,"dateModified":"2021-04-29T07:28:45.9055342+00:00","dateCreated":"2021-04-29T07:28:45.6855547+00:00","hasChild":false,"isFile":false,"type":"","id":null,"filterPath":"\\","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null};
                }
        
                return res.status(200).json({"cwd":{"path":str,"action":null,"newName":null,"names":null,"name":"Files","size":0,"previousName":null,"dateModified":"2021-04-29T07:28:47.291145+00:00","dateCreated":"2021-04-29T07:28:47.3569643+00:00","hasChild":true,"isFile":false,"type":"","id":null,"filterPath":"","filterId":null,"parentId":null,"targetPath":null,"renameFiles":null,"uploadFiles":null,"caseSensitive":false,"searchString":null,"showHiddenItems":false,"data":null,"targetData":null,"permission":null},"files":str,"error":null,"details":null});
            });
        }

         /**
         * Details Files & Folder
         */
        if(req.body.action == "details"){

            var state = fs.statSync("./uploads"+req.body.path + req.body.names[0]);

            return res.status(200).json({
                "cwd": null,
                "files": null,
                "error": null,
                "details": {
                  "name": req.body.names[0],
                  "location": "./uploads"+req.body.path + req.body.names[0],
                  "isFile": state.isFile(),
                  "size": state.size,
                  "created": state.ctime,
                  "modified": state.mtime,
                  "multipleFiles": false,
                  "permission": null
                }
              });
        }

    }catch(err){
        console.log(err)
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}
