angular.module('hpTracker')
.directive("tables", [function() {
    return {
        templateUrl: '../../views/tables.tpl.html',
        controller: 'tableCtrl',
        replace: false
    };
}]);
 
