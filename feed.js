angular.module('feedModule', ['ngResource'])
    .factory('FeedLoader', function ($resource) {
        return $resource('/post/list', {}, {
            fetch: { method: 'JSONP', params: {categories: 'music'} }
        });
    })
    .service('FeedList', function ($rootScope, FeedLoader) {
        this.get = function() {
            if (feeds.length === 0) {
                for (var i=0; i<feedSources.length; i++) {
                    FeedLoader.fetch({}, function (data) {
                        var feed = data.responseData.feed;
                        feeds.push(feed);
                    });
                }
            }
            return feeds;
        };
    })
    .controller('FeedCtrl', function ($scope, FeedList) {
        $scope.feeds = FeedList.get();
        $scope.$on('FeedList', function (event, data) {
            $scope.feeds = data;
        });
    });