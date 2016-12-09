/**
 * Created by niko.strongioglou on 12/9/16.
 */

var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/main.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});