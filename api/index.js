const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fileManagerRoute = require('./routes/filemanager');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use('/api/v1', fileManagerRoute)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
 
 module.exports = app;