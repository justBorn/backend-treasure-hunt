/**
 * Created by alessandro on 02/09/14.
 */

var buildJSON = require('./src/buildJSON').forgeJson;
var readPhotosFolder = require('./src/fsUtils').readPhotosFolder;

var express = require('express');
var app = express();

app.get('/getJSON', function(req, res){

    readPhotosFolder('./img')
        .success(forgeJson)
        .fail(sendResponse);


    function forgeJson(fileList) {
        var response =buildJSON(req.headers.host,fileList);
        sendResponse(response);
    }

    function sendResponse (response){
        res.send(response);
    }

});

app.use("/img",express.static(process.cwd() + '/img'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});