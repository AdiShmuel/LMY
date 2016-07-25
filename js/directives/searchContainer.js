'use strict';
angular.module('lmyApp').directive('searchContainer', ['tracksService', function(tracksService) {

        return {
            restrict: 'E',
            templateUrl: 'templates/searchTemplate.html',
            scope:true,
            replace:true,
            link: function(scope, element, attributes) {
              

                scope.searchText = "";
                scope.records = [];
                scope.nextHref = "";
                scope.isMoreResults = true;

                scope.gettingClass = attributes.class;


                scope.searchTracks = function() {
                    self.setLastSearch();

                    tracksService.getFirstTracks(scope.searchText).then(function (tracks) {
                        scope.nextHref = "";
                        self.setList(tracks);
                    });
                }

                scope.next = function (){
                    tracksService.getNext(scope.nextHref).then(function (tracks) {
                        self.setList(tracks.data);
                    });
                }

                scope.openPicture = function(currentRecord){
                    scope.$parent[attributes.selectedTrackDataValue] = currentRecord;
                }

                self.setList = function(tracks) {
                    setTimeout(function () {
                        scope.$apply(function () {
                            scope.records = tracks.collection;

                            // Check if can go next
                            if (_.isEmpty(tracks.next_href)) {
                                scope.isMoreResults = false;
                            } else {
                                scope.nextHref = tracks.next_href;
                            }
                            console.log(tracks);
                        });
                    });
                }

                self.setLastSearch = function(){
                    if (!_.isEmpty(scope.searchText)){
                        var lastArray = scope.$parent[attributes.lastSearchDataValue];
                        lastArray.push(scope.searchText);
                        lastArray = _.unique(lastArray);
                        if (lastArray.length > 5 ){
                            scope.$parent[attributes.lastSearchDataValue] = lastArray.slice(lastArray.length-5, lastArray.length);
                        }
                    }
                }
            }
        };
    }]);
