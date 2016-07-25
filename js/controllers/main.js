(function(){
    "use strict";
    function mainCtrl($scope ){
        var self = this;
        SC.initialize({
            client_id: 'a44b75429f5bb8d3e4e91e2d69f84890'
        });
        $scope.lastSearch = [];
        $scope.trackSelected = {};

        $scope.$watch('trackSelected', function(newValue) {
            if (!_.isEmpty(newValue)){
                $scope.trackSelected = newValue;
            }
        });
    }

    angular.module('lmyApp').controller('mainCtrl', ['$scope',  mainCtrl])
})();