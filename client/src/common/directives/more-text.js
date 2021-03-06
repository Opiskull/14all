angular.module('one4all').directive('moreText', [function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><span ng-bind-html=\'text | truncate:150:"...":open | unsafe\'></span> <a ng-click="open=!open" ng-show="text.length > 150">{{ open ? "Less" : "More" }}</a></div>',
        link: function (scope, element, attrs) {
            scope.open = false;
        },
        scope: {
            text: '='
        }
    };
}]);