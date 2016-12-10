/**
 * Created by niko.strongioglou on 12/8/16.
 */

var http=require('http');
var url=require('url');
var fs=require('fs');
var io=require('socket.io');

/**
 * Chat Room info
 */
var post_id;
var description;
var post_name;
var username;

/**
 * Synopsis
 */
var title;
var synopsis;
var image;

var server = http.createServer(function(request,response){

        var path=url.parse(request.url).pathname;
        var url_parts = url.parse(request.url,true);
        var query=url_parts.query;
        post_id=query.post_id;
        description=query.description;
        post_name=query.post_name;
        username=query.username;

        console.log(url_parts);
        console.log(query);
        console.log(path);

        switch (path){
            case '/':

                response.writeHeader(200,{'Content-Type':'text/html'});
                response.write('Fuck off and die kind of type');
                response.end();
                break;
            case '/private_chat':
                fs.readFile(__dirname+path+'.html',function (error, data) {

                    getSynopsis();

                    var body=data.toString();
                    var updated_body=body.replace('url("")','url("'+image+'")');
                    console.log(updated_body);
                    // data.replace('url("")','url("'+image+'")');

                    response.writeHeader(200,{'Content-Type':'text/html'});
                    response.write(updated_body);
                    response.end();
                });
                break;

            case '/chat_room':
                fs.readFile(__dirname+path+'.html',function (error, data) {
                   if (error){
                       response.writeHeader(404);
                       response.write('Sorry dude the file did not exist');
                       response.end();
                   }else{

                       getSynopsis();

                       response.writeHeader(200,{'Content-Type':'text/html'});
                       response.write(data,"utf-8");
                       response.end();
                   }

                });
                break;
            default:
                response.writeHead(404);
                response.write("opps this doesn't exist - 404");
                response.end();
                break;
        }

        function getSynopsis() {
            var options = {
                host: '10.9.41.76',
                port: 8080,
                path: '/getSynopsis?post_id='+post_id,
                method: 'GET'
            };

            http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    var objResponse =JSON.parse(chunk);
                    console.log('title: ' + objResponse.title);
                    console.log('synopsis: ' + objResponse.synopsis);
                    console.log('image: ' + objResponse.image);
                    console.log('===================================');
                    title=objResponse.title;
                    synopsis=objResponse.synopsis;
                    image=objResponse.image;
                });
            }).end();
        }


    }
);

server.listen(8001);

//when the server is instantiated we're gonna open a listener for socket.io
var listener = io.listen(server);

listener.sockets.on('connection',function (socket) {

    socket.emit('chat_room_info',{
        'post_id':post_id,
        'post_name':post_name,
        'description':description,
        'username':username
    });

    socket.emit('create_overview',{
        'title':title,
        'synopsis':synopsis,
        'image':image
    });

    socket.on('client_data',function (data) {
       process.stdout.write(data.chat_message);
       socket.broadcast.emit('new_message_produced',{'text':data.chat_message,
                                                    'username':data.username
                                });
    });




});
