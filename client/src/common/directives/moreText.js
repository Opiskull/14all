angular.module('14all').directive('moreText',[function() {
    return {
        restrict:'E',
        replace:true,
        template:'<div>{{text | truncate:150:"...":open}} <a ng-click="open=!open" ng-show="text.length > 150" href=""><span ng-if="open">Less</span><span ng-if="!open">More</span></a></div>',
        link: function(scope, element, attrs) {
            scope.open=false;
        },
        scope:{
            text:'='
        }
    };
}]);