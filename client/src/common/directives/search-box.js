angular.module('one4all').directive('searchBox', ['$rootScope', '$timeout', 'settingsService', function ($rootScope, $timeout, settingsService) {
    return {
        restrict: 'EA',
        templateUrl: 'directives/search-box.html',
        scope: {
            focus: '='
        },
        link: function ($scope, $element, $attr) {
            $scope.keyword = '';
            $scope.emptyKeyword = function () {
                $scope.keyword = '';
            };
            $scope.keywordChanged = function () {
                _.debounce(function (newValue) {
                    $scope.$apply(function () {
                        if (settingsService.settings.filters.keyword !== newValue) {
                            settingsService.settings.filters.keyword = newValue;
                            $timeout(function () {
                                $rootScope.$emit('filter');
                            });
                        }
                    });
                }, 250);
            };
        }
    };
}]);