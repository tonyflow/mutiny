var posts = [];

var app = angular.module('mutiny', ['ngStomp']);
app
    .controller('PostCtrl', function ($scope, $http, $log, $stomp) {
        $stomp
            .connect('http://10.16.4.153:8080/channel')
            .then(function (frame) {
                var subscription = $stomp.subscribe('/topic/posts', function (payload, headers, res) {
                    console.log("payload is:" + payload);
                    posts.push(payload);
                    $scope.$apply(function () {
                        $scope.posts = posts;
                    });
                }, {
                    'headers': 'are awesome'
                })
            });


        $http.get('http://10.16.4.153:8080/post/list').then(function (response) {
            posts = response.data;
            $scope.posts = posts;
        });
    });

//http://stackoverflow.com/questions/15415705/angularjs-access-to-dom-element-inside-ng-repeat

app.directive('nop', function(){
    return {
        link: function(scope, elm){
            console.log('eee', elm, arguments);
            elm.click(function(){

                var title = elm.attr('title');

                vex.dialog.buttons.YES.text = 'Chat';
                vex.dialog.buttons.NO.text = 'Continue Browsing';

                vex.dialog.confirm({
                    input: [
                        '<h1>title</h1>',
                        '<h3>Participants</h3>',
                        '<ul>',
                        '<li>Nikos Strongioglou</li>',
                        '<li>Pinelopi Kouleri</li>',
                        '<li>Thanasis Bambakakis</li>',
                        '<li>Angeliki Soule</li>',
                        '</ul>',
                        '<h5>Latest Messages</h5>',
                        '<input type="text" style="display: none;" name="post_name" value="'+this.title+'">',
                        '<input type="text" style="display: none;" name="description" value="'+this.text+'">',
                        '<input type="text" style="display: none;" name="post_id" value="'+this.id+'">',
                        '<ul>',
                        '<li style="font-size: 15px">Niko: Worst so called masterpiece ever</li>',
                        '<li style="font-size: 15px">Pinelopi: No Way</li>',
                        '</ul>',
                    ].join(''),
                    callback: function(value) {
                        console.log(value.post_name);
                        console.log(value.post_id);
                        if (value) {
                            window.location.href = "http://10.9.41.76:8001/chat_room?" +
                                "username="+getCookie('username')+
                                "&post_id=" +value.post_id+
                                "&post_name=" +value.post_name+
                                "&description="+value.description;
                        };
                    }
                })
            });
        }
    }
});