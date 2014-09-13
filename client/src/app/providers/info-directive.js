angular.module('providers').directive('info', ['searchService', function (searchService) {
    return {
        restrict: 'E',
        template: '<div ng-if="item.open"><div ng-include="detailTemplate"></div><tags items="item.tags"></tags></div>',
        link: function (scope, element, attrs) {
            attrs.$observe('item.info', function () {
                if (scope.item.info) {
                    var provider = searchService.getProvider(scope.item.info.provider);
                    scope.detailTemplate = provider.detailUrl;
                    scope.info = scope.item.info;
                }
            });
        },
        scope: {
            item: '='
        }
    };
}]);