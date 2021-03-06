angular.module('auth', ['ngRoute', 'ngStorage'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/auth-login.html',
            controller: ['$scope', 'authService', '$routeParams', function ($scope, authService, $routeParams) {
                if ($routeParams.token) {
                    authService.login($routeParams.token);
                }
                $scope.heading = 'Login';
                $scope.message = 'You need to login to view this page!';
            }]
        })
            .when('/notauthorized', {
                templateUrl: 'auth/auth-message.html',
                controller: ['$scope', 'authService', function ($scope, authService) {
                    $scope.heading = 'Not Authorized';
                    $scope.message = 'You are not authorized to view this page!';
                }]
            })
            .when('/logout', {
                templateUrl: 'auth/auth-message.html',
                controller: ['$scope', 'authService', function ($scope, authService) {
                    $scope.heading = 'Logout';
                    $scope.message = 'Your logout was a success!';
                    authService.logout();
                }]
            }).
            otherwise('/all');
    }])
    .run(['$rootScope', 'authService', '$location', function ($rootScope, authService, $location) {
        authService.authenticateWithServer().success(function () {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if ((next.$$route) && (next.$$route.authRequired)) {
                    if (!authService.authInfo.isLoggedIn) {
                        event.preventDefault();
                        $location.path("/login");
                    }
                }
            });
        }).error(function () {
            $location.path("/login");
        });
    }]);