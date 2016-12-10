angular.module('mutiny', [])
    .controller('PostCtrl', function ($scope, $http) {
        $http.get('http://10.16.4.153:8080/post/list').then(function (response) {
            $scope.posts = response.data;
        });
    });