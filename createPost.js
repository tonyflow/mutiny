/**
 * Created by niko.strongioglou on 12/10/16.
 */


angular.module('createPostApp', [])
    .controller('CreatePostController', function($scope, $http) {
        $http.post('http://10.16.4.153:8080/post').
        then(function(response) {
            $scope.greeting = response.data;
        });
    });