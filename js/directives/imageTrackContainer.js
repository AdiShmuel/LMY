'use strict';
angular.module('lmyApp').directive('imageTrackContainer', ['tracksService', function(tracksService) {

    return {
        restrict: 'E',
        template: '<div ><img src="{{imgSrc}}"  class="col-lg-12" alt="{{trackSelected.title}}" ng-click="playMusic(trackSelected.id)"></div>',
        replace:true,
        link: function(scope, element, attributes) {


            scope.isMoreResults = true;
            scope.imgSrc = ""
            scope.$watch('trackSelected.artwork_url', function (newVal) {
                if (scope.trackSelected.artwork_url == null){
                    scope.imgSrc = "imgs/defaultCD.jpg";
                } else{
                    scope.imgSrc = scope.trackSelected.artwork_url;
                }
            })

            scope.trackSelected = scope.$parent[attributes.parentTrackSelected];
            scope.playMusic = function(trackId){
                tracksService.playMusic(trackId).then(function(player){
                    player.play();
                });
            }
        }
    };
}]);
