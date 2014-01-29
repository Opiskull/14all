angular.module('movie',['ngRoute','movie.resource'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/movie', {
            templateUrl: 'movie/list.html',
            controller: 'MovieListCtrl',
            authRequired: true
        });
    }])
    .controller('MovieListCtrl', ['$scope','Movies','$location','$filter', function ($scope,Movies,$location,$filter) {
        $scope.movies = Movies.getList().$object;;

        function removeMovie(movie){
            $scope.movies.splice($scope.movies.indexOf(movie),1);
        }

        $scope.remove = function(movie){
            movie.remove().then(function(){
                removeMovie(movie);
            });
        };

        $scope.update = function(movie){
            movie.put().then(function(updatedMovie){
                movie.editable = false;
                movie.updatedAt = updatedMovie.updatedAt
            });
        };

        $scope.cancel = function(movie){
            if(movie.isnew){
                $scope.newmovie= {};
            }
            movie.editable = false;
        };

        $scope.add = function(){
            $scope.newmovie = {isnew:true};
        };

        $scope.create = function(movie){
            Movies.post(movie).then(function(addedMovie){
                $scope.newmovie = {};
                $scope.movies.push(addedMovie);
            },function(response){
                console.log("Error");
            });
        };

        $scope.finished = function(movie){
            movie.finished = !movie.finished;
            movie.put().then(function(updatedMovie){
                movie.updatedAt = updatedMovie.updatedAt
            });
        };
    }]);