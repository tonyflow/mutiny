var app = angular.module('mutiny', []);

    app.controller('PostCtrl', function ($scope, $http) {
        $http.get('http://10.16.4.153:8080/post/list').then(function (response) {

            console.log(response.data);

            $scope.posts = response.data;
        });
    });



app.directive('nop', function(){
    return {
        link: function(scope, elm){
            console.log('eee', elm, arguments);
            elm.click(function(){

                vex.dialog.buttons.YES.text = 'Chat';
                vex.dialog.buttons.NO.text = 'Continue Browsing';

                vex.dialog.confirm({
                    message: 'Catcher on the Rye : A bullshit book about a brat who wants to be James Dean',
                    input: [
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