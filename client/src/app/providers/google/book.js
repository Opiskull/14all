angular.module('providers').factory('googleBooks', ['Restangular', function (restangular) {
    var searchUrl = 'google/books/search';
    var detailUrl = 'providers/google/book-detail.html';
    var service = {
        title: 'google-books',
        display: 'Google - Books',
        category: 'book',
        detailUrl: detailUrl,
        search: function (keyword) {
            return restangular.one(searchUrl + '?search=' + keyword).getList().then(function (items) {
                return restangular.stripRestangular(items);
            }, function () {

            });
        }
    };
    return service;
}]);